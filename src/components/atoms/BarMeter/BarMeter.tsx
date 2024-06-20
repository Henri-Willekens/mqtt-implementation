import React, { useEffect, useState } from "react";

import BarMeterProps from './BarMeter.types';
import './BarMeter.scss';

const BarMeter: React.FC<BarMeterProps> = ({ maxValue, unit, title, label, alertLines }) => {
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

  const generateTackLines = (maxValue: number, numTicks: number) => {
    const tickLines = [];
    const tickSpacing = 300 / (numTicks - 1);

    for (let i = 0; i < numTicks; i++) {
      const y = 2 + i * tickSpacing;
      const value = maxValue - (i * (maxValue / (numTicks - 1)));
      
      tickLines.push(
        <g className="barmeter-tickline" key={i}>
          <line x1="54" x2="64" y1={y} y2={y} />
          <text x="69" y={y + 13}>{Math.round(value)}</text>
        </g>
      )
    }

    return tickLines;
  };

  const determineAlertLinesLocation = (alertValues: [{alertType: string, value: number}], maxValue: number) => {
    const alertLines = [];

    const barmeterHeight = 304;

    for (let alertValue of alertValues) {
      const yPos = barmeterHeight - (alertValue.value / maxValue) * barmeterHeight;
      alertLines.push(
        <line className={`barmeter-alertlines__${alertValue.alertType}`} x1="0" x2="54" y1={yPos} y2={yPos} />
      )
    }

    return alertLines;
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
      <p>{label}</p>
      <svg width="150" height="350">
        <rect className="barmeter-background" width="50" height="300" x="2" y="2" />

        <rect className={`barmeter-filling ${title}`} width="50" y="302" height="0" x="2" />

        <g className="barmeter-alertlines">
          {determineAlertLinesLocation(alertLines, maxValue)}
        </g>

        <g className="barmeter-ticklines">
          {generateTackLines(maxValue, 5)}
        </g>

        <text className="barmeter-unit" x="25" y="325">{unit}</text>
      </svg>
    </div>
  );
};

export default BarMeter;