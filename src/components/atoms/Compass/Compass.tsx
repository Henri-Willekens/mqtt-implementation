import React, { useState, useEffect } from "react";

import CompassProps from './Compass.types';
import './Compass.scss';

const Compass: React.FC<CompassProps> = ({ source, currentLocationOutside }) => {
  const [theme, setTheme] = useState('day');
  const [currentHeading, setCurrentHeading] = useState(0);

  const update = (elementToSelect: string, updatedValue: number) => {
    let element = document.getElementById(elementToSelect);
    element?.setAttribute("transform", `rotate(${updatedValue}, 200, 200)`)
  };

  useEffect(() => {
    update('wind-speed', 300);
    update('current', 243);

    const interval = setInterval(() => {
      setCurrentHeading(prevHeading => (prevHeading + 5));
    }, 1000)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    update('hdg', currentHeading);
    update('cog', currentHeading + 20);
  }, [currentHeading]);

  return (
    <div className="compass">
      <svg width="400" height="400">
        <circle className={`compass-windrose compass-windrose__${theme}`} cx="200" cy="200" r="150" />

        <g className="compass-windrose-lines" fontSize="12">
          <g>
            <line className={`compass-windrose-line compass-windrose-line__${theme}`} x1="200" y1="45" x2="200" y2="55" />
            <text className={`compass-windrose-text compass-windrose-text__${theme}`} x="200" y="35">0</text>
          </g>
          <g>
            <line className={`compass-windrose-line compass-windrose-line__${theme}`} x1="200" y1="345" x2="200" y2="355" />
            <text className={`compass-windrose-text compass-windrose-text__${theme}`} x="200" y="375">180</text>
          </g>
          <g>
            <line className={`compass-windrose-line compass-windrose-line__${theme}`} x1="355" y1="200" x2="345" y2="200" />
            <text className={`compass-windrose-text compass-windrose-text__${theme}`} x="370" y="205">90</text>
          </g>
          <g>
            <line className={`compass-windrose-line compass-windrose-line__${theme}`} x1="55" y1="200" x2="45" y2="200" />
            <text className={`compass-windrose-text compass-windrose-text__${theme}`} x="25" y="205">270</text>
          </g>
        </g>

        <g className={`compass-inner-windrose-lines__${theme}`}>
          <line x1="70" y1="200" x2="330" y2="200" />
          <line x1="200" y1="70" x2="200" y2="330" />
        </g>

        <g id="hdg">
          <path className={`compass-ship compass-ship__${theme}`} d="M 180 120 L 180 335 L 220 335 L 220 120 C 220 93 206 65 200 65 C 194 65 180 93 180 120 Z" />
        </g>

        <g id="cog" className={`compass-cog compass-cog__${theme}`}>
          <line x1="200" y1="70" x2="200" y2="200" />
          <polygon points="200,60 210,80 190,80" />
          <circle cx="200" cy="200" r="5" />
        </g>

        <g id='wind-speed'>
          <polygon points="200,30 190,10 210,10" fill='red' />
        </g>

        <g id='current'>
          {currentLocationOutside 
            ? <polygon points="200,30 190,10 210,10" fill='blue' />
            : <polygon points="200,70 190,90 210,90" fill='blue' />
          }
        </g>
      </svg>
      <div className={`compass-source compass-source__${theme}`}>
        <p>{source}</p>
      </div>
    </div>
  );
};

export default Compass;