import React, { useEffect } from 'react';
import config from '../config.json';

export default function Rudder({ degrees, radius }) {
  const width = 2 * radius;
  const height = 2 * radius;
  const centerX = radius;
  const centerY = radius;

  // Calculate the endpoint of the arc for port side
  const portAngle = degrees * Math.PI / 180;
  const portX = centerX + radius * Math.sin(portAngle);
  const portY = centerY - radius * Math.cos(portAngle);

  // Calculate the endpoint of the arc for starboard side
  const starboardAngle = -degrees * Math.PI / 180;
  const starboardX = centerX + radius * Math.sin(starboardAngle);
  const starboardY = centerY - radius * Math.cos(starboardAngle);

  // Path data for port side arc
  const portPath = `M${centerX},${centerY} L${centerX},${centerY - radius} A${radius},${radius} 0 0,1 ${portX},${portY} Z`;
  
  // Path data for starboard side arc
  const starboardPath = `M${centerX},${centerY} L${centerX},${centerY - radius} A${radius},${radius} 0 0,0 ${starboardX},${starboardY} Z`;

  function updateRudderAngle(rudderAngle) {
    const rudderArrow = document.getElementById('rudder-pointer');
    rudderArrow.setAttribute("transform", `rotate(${rudderAngle}, 90, 90)`)
  }

  const angle = config.values.angle;
  useEffect(() => {
    updateRudderAngle(angle);
  }, [])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Port side arc */}
      <path d={portPath} fill="red" />
      
      {/* Starboard side arc */}
      <path d={starboardPath} fill="green" />
      
      {/* Center line */}
        <g id='rudder-pointer'>
            <polygon points='90,0 85,10 95,10' fill='#EFEFEF' />
            <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - radius + 2} stroke="#EFEFEF" strokeWidth="2" />
        </g>
    </svg>
  );
};
