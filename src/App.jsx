import './App.scss';
import Compass from './components/atoms/Compass/Compass';
import BarMeter from './components/atoms/BarMeter/BarMeter';
import Rudder from './components/atoms/Rudder/Rudder';
import Header from './components/molecules/Header/Header';
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

  }, []);

  return (
    <div className="app">
      <div className="main">
        <Header />
        <div className="components">
          <Compass />
          {/* <Rudder degrees={90} radius={90} angle={-30} /> */}
          <BarMeter value={50} className="pro-2"/>
          <BarMeter value={20} className="pro-1" />
        </div>
      </div>
    </div>
  );
}

export default App;
