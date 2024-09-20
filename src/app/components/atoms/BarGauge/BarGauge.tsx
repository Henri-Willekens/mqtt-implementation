import BarMeterProps from './BarGauge.types';
import './BarGauge.scss';

import { useEffect, useState } from 'react';
import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import { Config } from 'src/app/configuration/types';

const BarGauge: React.FC<BarMeterProps> = ({ maxValue, unit, id, label, alertLines, numberOfTickLines, content, configEnabled, activePageId }) => {
  const [_currentValue, setCurrentValue] = useState(0);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_configData, setConfigData] = useState<Config>();
  const [_formValues, setFormValues] = useState({
    maxValue: maxValue,
    unit: unit,
    id: id,
    label: label,
    numberOfTickLines: numberOfTickLines
  });


  const updateBarMeter = (_value: number) => {
    let _percentage = (_value / maxValue) * 100;

    let _barMeterFilling = document.querySelector(`.bar-gauge__fill.${id}`) as HTMLElement;

    const _containerHeight = 250;
    const _fillHeight = (_percentage / 100) * _containerHeight;
    const _newY = _containerHeight - _fillHeight;

    if (_barMeterFilling != null) {
      _barMeterFilling.style.height = `${_fillHeight}px`;
      _barMeterFilling.setAttribute('y', _newY.toString());
    }
  };


  const generateTickLines = () => {
    const _tickLines: any[] = [];
    const _tickSpacing = 250 / (numberOfTickLines - 1);

    for (let i = 0; i < numberOfTickLines; i++) {
      const _y = 1 + i * _tickSpacing;
      const _value = maxValue - (i * (maxValue / (numberOfTickLines - 1)));

      _tickLines.push(
        <g className='bar-gauge__tick-line' key={i}>
          {/* <line x1='62' x2='72' y1={_y} y2={_y} /> */}
          <text x='70' y={_y + 10}>{Math.round(_value)}</text>
        </g>
      )
    }

    return _tickLines;
  };


  const determineAlertLinesLocation = () => {
    const _alertLines: any[] = [];

    const _barmeterHeight = 250;

    for (let _alertValue of alertLines) {
      const yPos = _barmeterHeight - (_alertValue.value / maxValue) * _barmeterHeight;
      _alertLines.push(
        <line className={`bar-gauge__alert-lines__${_alertValue.alertType}`} x1='10' x2='60' y1={yPos} y2={yPos} />
      )
    }

    return _alertLines;
  };


  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
      fetch('/api/read-json')
      .then((res) => res.json())
      .then((results) => { 
        setConfigData(results);
      })
      .catch((err) => console.error(err));
    };
  };


  const closeModal = () => {
    setIsModalOpen(false);
    handleSave();
  };


  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };


  const handleSave = () => {
    if (_configData === undefined) {
      return;
    }

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        maxValue: parseInt(_formValues.maxValue),
        id: _formValues.id,
        numberOfTickLines: parseInt(_formValues.numberOfTickLines),
        label: _formValues.label,
        unit: _formValues.unit
      }
    };

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_configData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => console.error('Error saving data:', error));
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
        <p className='bar-gauge__label'>{label}</p>
        <svg width='130' height='300' viewBox='0 0 130 320'>
          <g className='bar-gauge__base'>
            <rect x='11' y='0' width='50' height='250' className='bar-gauge__background' />

            <g>
              <rect width='50' height='250' x='10.5' y='0.5' className={`bar-gauge__fill ${id} ${content !== null && 'bar-gauge__fill__' + content}`} />
            </g>

            <rect x='10.5' y='0.5' width='50' height='250' className='bar-gauge__stroke' />
          </g>

          <g className='bar-gauge__alert-lines'>
            {determineAlertLinesLocation()}
          </g>

          <g className='bar-gauge__tick-lines'>
            {generateTickLines()}
          </g>

          <defs>
            <linearGradient id='paint1_linear_988_2110' x1='200' y1='70' x2='200' y2='330' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#343453'/>
              <stop offset='1' stopColor='#7474B9'/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onClose={closeModal} cancelText='Discard changes' submitText='Save changes'>
        <InputField label='Element ID' type='text' id='id' value={_formValues.id} onChange={handleFormChange} />
        <InputField label='Element label' type='text' id='label' value={_formValues.label} onChange={handleFormChange} />
        <InputField label='Unit' type='text' id='unit' value={_formValues.unit} onChange={handleFormChange} />
        <InputField label='Maximum value' type='number' id='maxValue' value={_formValues.maxValue} onChange={handleFormChange} />
        <InputField label='Number of tick lines' type='number' id='numberOfTickLines' value={_formValues.numberOfTickLines} onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default BarGauge;