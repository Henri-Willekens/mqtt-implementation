const express = require('express');
const mqtt = require('mqtt');
const { WebSocketServer } = require('ws');

const app = express();
const mqttClient = mqtt.connect("mqtt://aquabots.tech:1883", {
  username: "jan", // Replace with your username
  password: "welkom01", // Replace with your password
});

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
});

// Create HTTP server
const server = app.listen(4000, () => {
  console.log('Server is running on port 4000');
});

// Create WebSocket server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  // Handle WebSocket messages to publish to MQTT
  ws.on('message', (data) => {
    const { topic, message } = JSON.parse(data);
    mqttClient.publish(topic, message);
  });
});

// Upgrade HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Connect to the MQTT broker
mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('#'); // Subscribe to all topics
});

// Log MQTT messages in the console and forward them to WebSocket clients
mqttClient.on('message', (topic, message) => {
  const messageString = message.toString();

  // Log the received topic and message to the console
  console.log(`Received message: Topic = ${topic}, Message = ${messageString}`);

  // Send the message to WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ topic, message: messageString }));
    }
  });
});

app.get('/', (req, res) => {
  res.send('MQTT is working!');
});
