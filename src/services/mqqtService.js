// src/services/mqttService.js

import mqtt from 'mqtt';

class MqttService {
  constructor() {
    this.client = null;
  }

  connect(brokerUrl, options = {}) {
    this.client = mqtt.connect(brokerUrl, options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (err) => {
      console.error('Connection error: ', err);
      this.client.end();
    });
  }

  subscribe(topic, options = {}, callback) {
    if (this.client) {
      this.client.subscribe(topic, options, (err, granted) => {
        if (err) {
          console.error('Subscribe error: ', err);
        } else {
          console.log(`Subscribed to ${topic}`);
          this.client.on('message', (topic, message) => {
            callback(topic, message.toString());
          });
        }
      });
    }
  }

  publish(topic, message, options = {}, callback) {
    if (this.client) {
      this.client.publish(topic, message, options, callback);
    }
  }

  disconnect() {
    if (this.client) {
      this.client.end();
    }
  }
}

const mqttService = new MqttService();
export default mqttService;
