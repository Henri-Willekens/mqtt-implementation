import React, { useEffect, useState } from "react";

import BarMeterProps from './BarMeter.types';
import './BarMeter.scss';

const BarMeter: React.FC<BarMeterProps> = ({ xPos, yPos, maxValue, unit, title, label, alertLines, numberOfTickLines }) => {
  const [_currentValue, setCurrentValue] = useState(0);


  const updateBarMeter = (_value: number) => {
    let _percentage = (_value / maxValue) * 100;

    let _barMeterFilling = document.querySelector(`.barmeter-filling.${title}`) as HTMLElement;

    const _containerHeight = 302;
    const _fillHeight = (_percentage / 100) * _containerHeight;
    const _newY = _containerHeight - _fillHeight;

    if (_barMeterFilling != null) {
      _barMeterFilling.style.height = `${_fillHeight}px`;
      _barMeterFilling.setAttribute('y', _newY.toString());
    }
  };


  const generateTackLines = () => {
    const _tickLines = [];
    const _tickSpacing = 300 / (numberOfTickLines - 1);

    for (let i = 0; i < numberOfTickLines; i++) {
      const _y = 2 + i * _tickSpacing;
      const _value = maxValue - (i * (maxValue / (numberOfTickLines - 1)));
      
      _tickLines.push(
        <g className="barmeter-tickline" key={i}>
          <line x1="54" x2="64" y1={_y} y2={_y} />
          <text x="69" y={_y + 13}>{Math.round(_value)}</text>
        </g>
      )
    }

    return _tickLines;
  };


  const determineAlertLinesLocation = () => {
    const _alertLines = [];

    const _barmeterHeight = 304;

    for (let _alertValue of alertLines) {
      const yPos = _barmeterHeight - (_alertValue.value / maxValue) * _barmeterHeight;
      _alertLines.push(
        <line className={`barmeter-alertlines__${_alertValue.alertType}`} x1="0" x2="54" y1={yPos} y2={yPos} />
      )
    }

    return _alertLines;
  };


  useEffect(() => {
      let _element = document.querySelector(`.barmeter.${title}`) as HTMLElement;
      _element.style.left = xPos;
      _element.style.top = yPos;

    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * (maxValue + 1)));
    }, 1000)

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    updateBarMeter(_currentValue);
  }, [_currentValue]);

  
  return (
    <div className={`barmeter ${title}`}>
      <p>{label}</p>
      <svg width="150" height="350">
        <rect className="barmeter-background" width="50" height="300" x="2" y="2" />

        <rect className={`barmeter-filling ${title}`} width="50" y="302" height="0" x="2" />

        <g className="barmeter-alertlines">
          {determineAlertLinesLocation()}
        </g>

        <g className="barmeter-ticklines">
          {generateTackLines()}
        </g>

        <text className="barmeter-unit" x="25" y="325">{unit}</text>
      </svg>
    </div>
  );
};

export default BarMeter;