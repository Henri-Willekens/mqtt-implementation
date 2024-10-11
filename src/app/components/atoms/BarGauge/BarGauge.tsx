import BarGaugeProps from './BarGauge.types';
import './BarGauge.scss';

import { useContext, useEffect, useState } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';

import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import useFormInput from 'src/app/hooks/useFormInput';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import SelectField from '../FormInputs/SelectField/SelectField';

const BarGauge: React.FC<BarGaugeProps> = ({
  id,
  label = 'Label',
  maxValue = 2000,
  alertLines = [],
  numberOfTickLines = 5,
  width,
  height,
  alarmSource = 'config'
}) => {
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activePageId } = useContext(ActivePageIdContext);

  const [_currentValue, setCurrentValue] = useState(0);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    _maxValue: maxValue,
    _numberOfTickLines: numberOfTickLines,
    _label: label,
    _width: width,
    _height: height,
    _alarmSource: alarmSource,
    _alarmTooHigh: 0,
    _warningTooHigh: 0,
    _alarmTooLow: 0,
    _warningTooLow: 0
  });
  const { _formValues, handleChange, resetForm } = useFormInput(_initialValues);

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
        <line key={_alertValue.value} className={`bar-gauge__alert-lines__${_alertValue.alertType}`} x1='10' x2='60' y1={yPos} y2={yPos} />
      )
    }

    return _alertLines;
  };

  const openModal = () => {
    if (_configEnabled) {
      setIsModalOpen(true);
    };
  };

  const closeModal = () => {
    if (_configEnabled) {
      setIsModalOpen(false);
      fetch('/api/read-json?file=config.json')
      .then((res) => res.json())
      .then((results) => { 
        setConfigData(results);
      })
      .catch((err) => console.error(err));      
    };
  };

  const handleSubmit = () => {
    if (_configData === undefined || _configData === null) {
      return;
    }

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === _activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        maxValue: Math.floor(parseInt(_formValues._maxValue.toString())),
        content: _formValues._content,
        numberOfTickLines: Math.floor(parseInt(_formValues._numberOfTickLines.toString())),
        label: _formValues._label,
        width: _formValues._width,
        height: _formValues._height,
        alarmSource: _formValues._alarmSource,
        alertLines: [
          {
            value: _formValues._alarmTooHigh,
            alertType: 'alarm'
          },
          {
            value: _formValues._warningTooHigh,
            alertType: 'warning'
          },
          {
            value: _formValues._alarmTooLow,
            alertType: 'alarm'
          },
          {
            value: _formValues._warningTooLow,
            alertType: 'warning'
          }
        ]
      }
    };

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_configData),
    })
      .then(((_response) => _response.json()))
      .catch((_error) => console.error('Error saving data:', _error));

    closeModal();
  };

  useEffect(() => {
    // Create mock data
    const _interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * (maxValue + 1)));
    }, 1000)

    return () => clearInterval(_interval);
  }, []);

  useEffect(() => {
    updateBarMeter(_currentValue);
  }, [_currentValue]);

  return(
    <>
      <div onDoubleClick={openModal} className={`barmeter ${id}`}>
        <p className='bar-gauge__label'>{label}</p>
        <svg width={width} height={height} viewBox='0 0 130 320'>
          <g className='bar-gauge__base'>
            <rect x='11' y='0' width='50' height='250' className='bar-gauge__background' />

            <g>
              <rect width='50' height='250' x='10.5' y='0.5' className={`bar-gauge__fill ${id}`} />
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
              <stop stopColor='#7474B9'/>
              <stop offset='1' stopColor='#343453'/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal}>
        <InputField label='Element label' type='text' id='_label' value={_formValues._label} onChange={handleChange} />
        <InputField label='Maximum value' type='number' id='_maxValue' value={_formValues._maxValue} onChange={handleChange} />
        <InputField label='Number of tick lines' type='number' id='_numberOfTickLines' value={_formValues._numberOfTickLines} onChange={handleChange} />
        <InputField label='Width (px)' type='number' id='_width' value={_formValues._width} onChange={handleChange} />
        <InputField label='Height (px)' type='number' id='_height' value={_formValues._height} onChange={handleChange} />
        <SelectField label='Alarm source' id='_alarmSource' value={_formValues._alarmSource.toString()} options={['mqtt', 'config']} onChange={handleChange} />
        { _formValues._alarmSource === 'config' && (
          <>
            <InputField label='Alarm too high' type='text' id='_alarmTooHigh' value={_formValues._alarmTooHigh} onChange={handleChange} />
            <InputField label='Warning too high' type='text' id='_warningTooHigh' value={_formValues._warningTooHigh} onChange={handleChange} />
            <InputField label='Warning too low' type='text' id='_warningTooLow' value={_formValues._warningTooLow} onChange={handleChange} />
            <InputField label='Alarm too low' type='text' id='_alarmTooLow' value={_formValues._alarmTooLow} onChange={handleChange} />
          </>
        )}
      </FormModal>
    </>
  );
};

export default BarGauge;