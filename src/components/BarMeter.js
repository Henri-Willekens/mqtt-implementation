import React, { useState } from 'react';
import {useEffect} from 'react';

export default function BarMeter(props) {
  let [minValue, setMinValue] = useState(0);
  let [maxValue, setMaxValue] = useState(900);
  // let [value, setValue] = useState(0);

  function fillProgressBar(value) {
    let percentage = (value / maxValue) * 100;

    const progressBar = document.querySelector(`.${props.className}-progress-bar`);

    const containerHeight = 302; // Total height of the container
    const fillHeight = (percentage / 100) * containerHeight;
    const newY = containerHeight - fillHeight;

    progressBar.style.height = `${fillHeight}px`;
    progressBar.setAttribute('y', newY);
  }

  useEffect(() => {
    fillProgressBar(props.value)
  }, [])

  return (
    <div className={props.className}>
        <svg width="150" height="350" className="progress-container">
        <rect className="progress-bar-bg" width="50" height="300" fill="#121212" x="2" y="2" stroke="#2B2B39" strokeWidth="1" />
        
        <rect className={`${props.className}-progress-bar`} width="50" y="302" height="0" fill="#353548" x="2" />
        
        <g>
          <line x1="0" x2="54" y1="50" y2="50" stroke="#E41B1B" strokeWidth="2"/>
          <line x1="0" x2="54" y1="95" y2="95" stroke="#FF910F" strokeWidth="2"/>
        </g>

        <g>
          <line x1="54" x2="64" y1="2" y2="2" stroke="#EFEFEF" strokeWidth="2"/>
          <text x="69" y="15" fill="#EFEFEF">{maxValue}</text>
        </g>
        <g>
          <line x1="54" x2="64" y1="77" y2="77" stroke="#EFEFEF" strokeWidth="2"/>
          <text x="69" y="90" fill="#EFEFEF">675</text>
        </g>
        <g>
          <line x1="54" x2="64" y1="152" y2="152" stroke="#EFEFEF" strokeWidth="2"/>
          <text x="69" y="165" fill="#EFEFEF">450</text>
        </g>
        <g>
          <line x1="54" x2="64" y1="229" y2="229" stroke="#EFEFEF" strokeWidth="2"/>
          <text x="69" y="242" fill="#EFEFEF">225</text>
        </g>
        <g>
          <line x1="54" x2="64" y1="302" y2="302" stroke="#EFEFEF" strokeWidth="2"/>
          <text x="69" y="315" fill="#EFEFEF">{minValue}</text>
        </g>

        <text x="25" y="325" fill="#EFEFEF" textAnchor="middle">°C</text>
      </svg>
    </div>
  );
}