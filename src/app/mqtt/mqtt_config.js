const express = require('express');
const mqtt = require('mqtt');
const { WebSocketServer } = require('ws');
const fs = require('fs'); // Require fs to handle file operations

const app = express();
const mqttClient = mqtt.connect("mqtt://aquabots.tech:1883", {
  username: "jan",
  password: "welkom01",
});

let uniqueTopics = new Set(); // Use a Set to store unique topics

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

const server = app.listen(4000, () => {
  console.log('Server is running on port 4000');
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

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('#'); // Subscribe to all topics
});

mqttClient.on('message', (topic, message) => {
  const messageString = message.toString();
  console.log(`Received message: Topic = ${topic}, Message = ${messageString}`);

  // Add the topic to the Set of unique topics
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

// Endpoint to retrieve unique topics
app.get('/api/topics', (req, res) => {
  res.json(Array.from(uniqueTopics)); // Send the unique topics as a JSON response
});

app.get('/', (req, res) => {
  res.send('MQTT is working!');
});
