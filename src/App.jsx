import './App.scss';
import Compass from './components/Compass';
import BarMeter from './components/BarMeter';
import Rudder from './components/Rudder';
import config from './config.json';

import { useState, useEffect } from 'react';

import mqttService from './services/mqttService';

function App() {

  // const radius = config.values.radius;
  // const angle = config.values.angle;

  // console.log(`Primary Color: ${primaryColor}`);
  // console.log(`Secondary Color: ${secondaryColor}`);

  // loop through all pages, for every page create Page
  // Page has function to add objects to page
  // then add in the object required

  const [message, setMessage] = useState('');

  useEffect(() => {
    const brokerUrl = 'wss://test.mosquitto.org:8081'; // Using WebSocket for browser compatibility
    mqttService.connect(brokerUrl);

    mqttService.subscribe('test/topic', {}, (topic, message) => {
      console.log(`Received message: ${message} from topic: ${topic}`);
      setMessage(message);
    });

    return () => {
      mqttService.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <p>Received Message: {message}</p>
      <Compass />
      <Rudder degrees={90} radius={90} angle={-30} />
      <BarMeter value={340} className="pro-2"/>
      <BarMeter value={560} className="pro-1" />
    </div>
  );
}

export default App;
