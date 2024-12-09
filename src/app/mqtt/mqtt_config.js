const express = require('express');
const mqtt = require('mqtt');
const { WebSocketServer } = require('ws');
const fs = require('fs');

const app = express();
let mqttClient; 
let uniqueTopics = new Set(); 
const configFilePath = '../configuration/config.json';

let config = {
  mqttUrl: "",
  username: "",
  password: "",
};


function loadConfig() {
  if (fs.existsSync(configFilePath)) {
    try {
      const fileContent = fs.readFileSync(configFilePath, 'utf8');
      const parsedConfig = JSON.parse(fileContent);
      config = { ...config, ...parsedConfig }; 
      console.log('Config reloaded:', config);
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
    mqttClient.end(true); // Close existing connection
    console.log('Previous MQTT client connection closed.');
  }

  mqttClient = mqtt.connect(config.mqttUrl, {
    username: config.mqttUsername || "",
    password: config.mqttPassword || "",
  });

  mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('#'); // Subscribe to all topics
  });

  mqttClient.on('message', (topic, message) => {
    const messageString = message.toString();
    console.log(`Received message: Topic = ${topic}, Message = ${messageString}`);

    uniqueTopics.add(topic);

    // Save the unique topics to a file
    fs.writeFile('topics.json', JSON.stringify(Array.from(uniqueTopics)), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      }
    });

    // Send the message to WebSocket clients
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

// Load config initially and start the MQTT client
loadConfig();
initializeMqttClient();

// Watch for changes to config.json
fs.watch(configFilePath, (eventType) => {
  if (eventType === 'change') {
    console.log('Config file changed, reloading...');
    loadConfig();
    initializeMqttClient();
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

const server = app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (data) => {
    const { topic, message } = JSON.parse(data);
    mqttClient.publish(topic, message);
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Endpoint to retrieve unique topics
app.get('/api/topics', (req, res) => {
  res.json(Array.from(uniqueTopics)); // Send the unique topics as a JSON response
});

app.get('/', (req, res) => {
  res.send('MQTT is working!');
});
