import React, { useState, useEffect } from "react";

import CompassProps from './Compass.types';
import './Compass.scss';

const Compass: React.FC<CompassProps> = ({ source, waveArrowOutside, theme, stepsOfDegrees}) => {
  const [currentHeading, setCurrentHeading] = useState(0);
  const [windspeed, setWindspeed] = useState('13');
  const [correctData, setData] = useState('incomplete');

  const update = (elementToSelect: string, updatedValue: number) => {
    let element = document.getElementById(elementToSelect);
    element?.setAttribute("transform", `rotate(${updatedValue}, 200, 200)`)
  };

  const generateWindRoseLines = (stepsOfDegrees: number, radius: number, centerX: number, centerY: number) => {
    const lines = [];

    for (let i = 0; i*stepsOfDegrees < 360; i++) {
      const angle = stepsOfDegrees * i;
      const radian = (angle * Math.PI) / 180;

      const x1 = centerX + (radius - 5) * Math.sin(radian);
      const y1 = centerY - (radius - 5) * Math.cos(radian);
      const x2 = centerX + (radius + 5) * Math.sin(radian);
      const y2 = centerY - (radius + 5) * Math.cos(radian);

      const textX = centerX + (radius + 25) * Math.sin(radian);
      const textY = centerY - (radius + 25) * Math.cos(radian);

      lines.push(
        <g key={i}>
          <line
            className={`compass-windrose-line compass-windrose-line__${theme}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
          />
          <text
            className={`compass-windrose-text compass-windrose-text__${theme}`}
            x={textX}
            y={textY}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {angle}
          </text>
        </g>
      );
    }

    return lines;
  };

  useEffect(() => {
    update('wind-speed', 320);
    update('current', 243);

    const interval = setInterval(() => {
      setCurrentHeading(prevHeading => (prevHeading + 5));
    }, 1000)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(correctData == 'incomplete'){
      setTimeout(() => {
        console.log('There is data missing, please check the data source.');
        setData("correct");
      }, 5000);
    } else {
    
    update('hdg', currentHeading);
    update('cog', currentHeading + 20);
    }
  }, [currentHeading]);

  return (
    <div className="">
      <svg width="400" height="400">
        <circle className={`compass-windrose compass-windrose__${theme}`} cx="200" cy="200" r="150" />

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
          <image href={`./icons/wind/windspeed-${windspeed}.svg`} x="188" y="0" />
        </g>

        <g id='current'>
          {waveArrowOutside 
            ? <image href="./icons/current/outside/current-1.svg" x="188" y="0" fill="red" />
            : <image href="./icons/current/inside/current-1.svg" x="188" y="70" />
          }
        </g>

        <g className="compass-windrose-lines" fontSize="12">
          {generateWindRoseLines(stepsOfDegrees, 150, 200, 200)}
        </g>
      </svg>
      <div className={`compass-source compass-source__${theme}`}>
        <p>{source}</p>
      </div>
    </div>
  );
};

export default Compass;