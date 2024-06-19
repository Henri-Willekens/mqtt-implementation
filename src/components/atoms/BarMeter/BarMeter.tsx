import React, { useEffect, useState } from "react";

import BarMeterProps from './BarMeter.types';
import './BarMeter.scss';

const BarMeter: React.FC<BarMeterProps> = ({ maxValue, unit, title }) => {
  const [currentValue, setCurrentValue] = useState(0);

  const updateBarMeter = (value: number) => {
    let percentage = (value / maxValue) * 100;

    let barMeterFilling = document.querySelector(`.barmeter-filling.${title}`) as HTMLElement;

    const containerHeight = 302;
    const fillHeight = (percentage / 100) * containerHeight;
    const newY = containerHeight - fillHeight;

    if (barMeterFilling != null) {
      barMeterFilling.style.height = `${fillHeight}px`;
      barMeterFilling.setAttribute('y', newY.toString());
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * (maxValue + 1)));
    }, 1000)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateBarMeter(currentValue);
  }, [currentValue]);

  return (
    <div className="barmeter">
      <svg width="150" height="350">
        <rect className="barmeter-background" width="50" height="300" x="2" y="2" />

        <rect className={`barmeter-filling ${title}`} width="50" y="302" height="0" x="2" />

        <g className="barmeter-alertlines">
          <line className="barmeter-alertlines__alarm" x1="0" x2="54" y1="50" y2="50" />
          <line className="barmeter-alertlines__warning" x1="0" x2="54" y1="95" y2="95" />
        </g>

        <g className="barmeter-tacklines">
          <g className="barmeter-tackline">
            <line x1="54" x2="64" y1="2" y2="2" />
            <text x="69" y="15">{maxValue}</text>
          </g>
          <g className="barmeter-tackline">
            <line x1="54" x2="64" y1="77" y2="77" />
            <text x="69" y="90">675</text>
          </g>
          <g className="barmeter-tackline">
            <line x1="54" x2="64" y1="152" y2="152" />
            <text x="69" y="165">450</text>
          </g>
          <g className="barmeter-tackline">
            <line x1="54" x2="64" y1="229" y2="229" />
            <text x="69" y="242">225</text>
          </g>
          <g className="barmeter-tackline">
            <line x1="54" x2="64" y1="302" y2="302" />
            <text x="69" y="315">0</text>
          </g>
        </g>

        <text className="barmeter-unit" x="25" y="325">{unit}</text>
      </svg>
    </div>
  );
};

export default BarMeter;