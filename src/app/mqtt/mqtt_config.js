const express = require('express');
const mqtt = require('mqtt');
const { WebSocketServer } = require('ws');
const fs = require('fs');
const chokidar = require('chokidar');

const app = express();
let mqttClient;
let uniqueTopics = new Set(); 
const configPath = '/app/src/app/configuration/config.json';  

let config = {
  mqttUrl: "",
  mqttUsername: "",
  mqttPassword: "",
  initializeMqttTopic: "", 
};

let previousConfig = { ...config };

function loadConfig() {
  if (fs.existsSync(configPath)) {
    try {
      const fileContent = fs.readFileSync(configPath, 'utf8');
      const parsedConfig = JSON.parse(fileContent);
      const updatedConfig = { ...config, ...parsedConfig };

      // Check if any of the relevant properties have changed
      const hasConfigChanged = 
        updatedConfig.mqttUrl !== previousConfig.mqttUrl ||
        updatedConfig.mqttUsername !== previousConfig.mqttUsername ||
        updatedConfig.mqttPassword !== previousConfig.mqttPassword ||
        updatedConfig.initializeMqttTopic !== previousConfig.initializeMqttTopic;

      if (hasConfigChanged) {
        console.log('Config updated:', updatedConfig);
        config = updatedConfig;
        previousConfig = { ...updatedConfig };
        initializeMqttClient(); // Reinitialize the MQTT client if configuration has changed
      } else {
        console.log('Config reloaded, but no change detected.');
      }
    } catch (err) {
      console.error('Error reading or parsing config file', err);
    }
  } else {
    console.warn('Config file not found, using default values.');
  }
}

// Function to initialize MQTT client
function initializeMqttClient() {
  if (mqttClient) {
    mqttClient.end(true); 
    console.log('Previous MQTT client connection closed.');
  }

  mqttClient = mqtt.connect(config.mqttUrl, {
    username: config.mqttUsername || "",
    password: config.mqttPassword || "",
  });

  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');

    if (config.initializeMqttTopic) {
      mqttClient.subscribe(config.initializeMqttTopic, (err) => {
        if (err) {
          console.error('Error subscribing to topic:', err);
        } else {
          console.log(`Subscribed to topic: ${config.initializeMqttTopic}`);
        }
      });
    } else {
      console.warn('No initializeMqttTopic found in config, using wildcard "#"');
      mqttClient.subscribe('#'); 
    }
  });

  mqttClient.on('message', (topic, message) => {
    const messageString = message.toString();
    console.log(`Received message: Topic = ${topic}, Message = ${messageString}`);

    uniqueTopics.add(topic);

    fs.writeFile('topics.json', JSON.stringify(Array.from(uniqueTopics)), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      }
    });

    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify({ topic, message: messageString }));
      }
    });
  });

  mqttClient.on('error', (err) => {
    console.error('MQTT client error:', err);
  });
}

loadConfig();

const watcher = chokidar.watch(configPath, { persistent: true, usePolling: true, interval: 1000 });
watcher.on('change', (event, path) => {
  console.log(`Config file changed at: ${path}`, event);
  loadConfig();
});
watcher.on('error', (err) => {
  console.error('Watcher error:', err);
});

// Express middleware for CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Start Express server
const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

// Set up WebSocket server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (data) => {
    const { topic, message } = JSON.parse(data);
    mqttClient.publish(topic, message, (err) => {
      if (err) {
        console.error('Error publishing message to MQTT broker:', err);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.get('/api/topics', (req, res) => {
  res.json(Array.from(uniqueTopics));
});

app.get('/', (req, res) => {
  res.send('MQTT is working!');
});
