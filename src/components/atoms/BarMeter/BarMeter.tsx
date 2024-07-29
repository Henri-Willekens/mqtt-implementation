import React, { useEffect, useState } from "react";

import BarMeterProps from './BarMeter.types';
import './BarMeter.scss';
import FormModal from "../../molecules/FormModal/FormModal";
import Input from "../Input/Input";

const BarMeter: React.FC<BarMeterProps> = ({ maxValue, unit, id, label, alertLines, numberOfTickLines, configEnabled }) => {
  const [_currentValue, setCurrentValue] = useState(0);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValues, setFormValues] = useState({
    maxValue: maxValue,
    unit: unit,
    id: id,
    label: label,
    numberOfTickLines: numberOfTickLines
  });


  const updateBarMeter = (_value: number) => {
    let _percentage = (_value / maxValue) * 100;

    let _barMeterFilling = document.querySelector(`.barmeter-filling.${id}`) as HTMLElement;

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


  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
    };
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * (maxValue + 1)));
    }, 1000)

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    updateBarMeter(_currentValue);
  }, [_currentValue]);


  return (
    <>
      <div onDoubleClick={openModal} className={`barmeter ${id}`}>
        <p>{label}</p>
        <svg width="150" height="350">
          <rect className="barmeter-background" width="50" height="300" x="2" y="2" />

          <rect className={`barmeter-filling ${id}`} width="50" y="302" height="0" x="2" />

          <g className="barmeter-alertlines">
            {determineAlertLinesLocation()}
          </g>

          <g className="barmeter-ticklines">
            {generateTackLines()}
          </g>

          <text className="barmeter-unit" x="25" y="325">{unit}</text>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onClose={closeModal} cancelText="Discard changes" submitText="Save changes">
        <Input type="text" label="ID" value={_formValues.id} id="id" name="id" onChange={handleFormChange} />
        <Input type="text" label="label" value={_formValues.label} id="label" name="label" onChange={handleFormChange} />
        <Input type="text" label="unit" value={_formValues.unit} id="unit" name="unit" onChange={handleFormChange} />
        <Input type="number" label="Max value" value={_formValues.maxValue} id="maxValue" name="maxValue" onChange={handleFormChange} />
        <Input type="number" label="Number of tick lines" value={_formValues.numberOfTickLines} id="numberOfTickLines" name="numberOfTickLines" onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default BarMeter;