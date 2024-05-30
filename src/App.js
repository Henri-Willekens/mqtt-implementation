import './App.css';
import Compass from './components/Compass';
import BarMeter from './components/BarMeter';
import Rudder from './components/Rudder';

import { useState, useEffect } from 'react';

import mqttService from './services/mqqtService';

function App() {

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
      <Rudder degrees={90} radius={90}/>
      <BarMeter value={340} className="pro-2"/>
      <BarMeter value={560} className="pro-1" />
    </div>
  );
}

export default App;
