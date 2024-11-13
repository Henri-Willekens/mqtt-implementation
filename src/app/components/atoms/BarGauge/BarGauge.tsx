import BarGaugeProps from './BarGauge.types';
import './BarGauge.scss';

import { useContext, useEffect, useState, useRef } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import SelectField from '../FormInputs/SelectField/SelectField';
import PredictiveSearchField from '../FormInputs/PredictiveSearchField/PredictiveSearchField';

import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import useFormInput from 'src/app/hooks/useFormInput';
import config from '../../../configuration/config.json';

const BarGauge: React.FC<BarGaugeProps> = ({
  id,
  label = 'Label',
  maxValue = 2000,
  alertLines = [],
  numberOfTickLines = 5,
  width = 130,
  height = 300,
  alarmSource = 'config', 
  dataSource = 'mqtt_topic',
  mqttTopic = '/example/topic'
}) => {
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activePageId } = useContext(ActivePageIdContext);

  const ws = useRef<WebSocket | null>(null);

  const [_currentValue, setCurrentValue] = useState(0);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    maxValue: maxValue,
    numberOfTickLines: numberOfTickLines,
    label: label,
    width: width,
    height: height,
    alarmSource: alarmSource,
    alarmTooHigh: 0,
    warningTooHigh: 0,
    alarmTooLow: 0,
    warningTooLow: 0,
    dataSource: dataSource,
    mqttTopic: mqttTopic
  });
  const { formValues, handleChange, resetForm } = useFormInput(_initialValues);

  const removeBarGauge = () => {
    if (!_configData) return;
  
    const pageIndex = _configData.pages.findIndex(page => page.id === _activePageId);
    if (pageIndex === -1) return;
  
    const updatedComponents = _configData.pages[pageIndex].components.filter(
      component => component.props.id !== id
    );
  
    const updatedConfigData = {
      ..._configData,
      pages: [
        ..._configData.pages.slice(0, pageIndex),
        {
          ..._configData.pages[pageIndex],
          components: updatedComponents,
        },
        ..._configData.pages.slice(pageIndex + 1),
      ],
    };


  setConfigData(updatedConfigData);

  // Send the updated configuration data to the server
  fetch('/api/write-json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedConfigData),
  })
  .then(response => response.json())
  .then(data => console.log('BarGauge removed:', data))
  .catch(error => console.error('Error removing BarGauge:', error));
};
  
  
  const updateBarMeter = (value: number) => {
    if ((value < 0 && maxValue > 0) || (value > 0 && maxValue < 0)) {
      console.log('Invalid: value and maxValue have opposite signs');
      value = 0;
    }
  
    // Calculate the percentage
    let percentage = (value / maxValue) * 100;
  
    // Make sure percentage is capped between 0% and 100%
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    let barMeterFilling = document.querySelector(`.bar-gauge__fill.${id}`) as HTMLElement;

    const containerHeight = 250;
    const fillHeight = (percentage / 100) * containerHeight;
    const newY = containerHeight - fillHeight;

    if (barMeterFilling != null) {
      barMeterFilling.style.height = `${fillHeight}px`;
      barMeterFilling.setAttribute('y', newY.toString());
    }
  };

  const generateTickLines = () => {
    const tickLines: any[] = [];
    const tickSpacing = 250 / (numberOfTickLines - 1);

    for (let i = 0; i < numberOfTickLines; i++) {
      const y = 1 + i * tickSpacing;
      const value = maxValue - (i * (maxValue / (numberOfTickLines - 1)));

      tickLines.push(
        <g className='bar-gauge__tick-line' key={i}>
          <text x='70' y={y + 10}>{Math.round(value)}</text>
        </g>
      )
    }

    return tickLines;
  };

  const determineAlertLinesLocation = () => {
    const alertLines: any[] = [];

    const barmeterHeight = 250;

    for (let alertValue of alertLines) {
      const yPos = barmeterHeight - (alertValue.value / maxValue) * barmeterHeight;
      alertLines.push(
        <line key={alertValue.value} className={`bar-gauge__alert-lines__${alertValue.alertType}`} x1='10' x2='60' y1={yPos} y2={yPos} />
      )
    }

    return alertLines;
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
        maxValue: Math.floor(parseInt(formValues.maxValue.toString())),
        content: formValues.content,
        numberOfTickLines: Math.floor(parseInt(formValues.numberOfTickLines.toString())),
        label: formValues.label,
        width: formValues.width,
        height: formValues.height,
        alarmSource: formValues.alarmSource,
        alertLines: [
          {
            value: formValues.alarmTooHigh,
            alertType: 'alarm'
          },
          {
            value: formValues.warningTooHigh,
            alertType: 'warning'
          },
          {
            value: formValues.alarmTooLow,
            alertType: 'alarm'
          },
          {
            value: formValues.warningTooLow,
            alertType: 'warning'
          }
        ],
        dataSource: formValues.dataSource,
        mqttTopic: formValues.mqttTopic
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
    if (dataSource === 'mqtt_topic') {
        // Connect to the WebSocket server in Bar Gauge
        ws.current = new WebSocket(config.websocketUrl);
    
        ws.current.onopen = () => {
          console.log("WebSocket connection established in Bar Gauge");
        };
    
        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const { topic, message } = data;
    
          if (topic === mqttTopic) {
            console.log(`Received message on topic "${topic}": ${message}`);
            updateBarMeter(message); // Convert to number and set state
          } }
        
    
        ws.current.onclose = () => {
          console.log("WebSocket connection closed in Bar Gauge");
        };
    
        // Cleanup function to close WebSocket connection when component unmounts
        return () => {
          ws.current?.close();
        };
    };
  }, [_currentValue])

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
      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal} onRemove={removeBarGauge}>
        <InputField label='Element label' type='text' id='label' value={formValues.label} onChange={handleChange} />
        <InputField label='Maximum value' type='number' id='maxValue' value={formValues.maxValue} onChange={handleChange} />
        <InputField label='Number of tick lines' type='number' id='numberOfTickLines' value={formValues.numberOfTickLines} onChange={handleChange} />
        <InputField label='Width (px)' type='number' id='width' value={formValues.width} onChange={handleChange} />
        <InputField label='Height (px)' type='number' id='height' value={formValues.height} onChange={handleChange} />
        <SelectField 
          label='Datasource' 
          id='dataSource' 
          value={formValues.dataSource.toString()} 
          options={[{label: 'MQTT topic', value: 'mqtt_topic'}, {label: 'UTC time', value: 'utc_time'}, {label: 'Local time', value: 'local_time'}]} 
          onChange={handleChange} 
        />
        {formValues.dataSource === 'mqtt_topic' && 
          <PredictiveSearchField 
            id='mqttTopic' 
            value={formValues.mqttTopic ? formValues.mqttTopic.toString() : ''} 
            onChange={(newValue) => handleChange(`mqttTopic:${newValue}`)}
          />
        }
        <SelectField 
          label='Alarm source' 
          id='alarmSource' 
          value={formValues.alarmSource.toString()} 
          options={[{label: 'From MQTT', value: 'mqtt'}, {label: 'From config', value: 'config'}]} 
          onChange={handleChange} 
        />
        { formValues.alarmSource === 'config' && (
          <>
            <InputField label='Alarm too high' type='text' id='alarmTooHigh' value={formValues.alarmTooHigh} onChange={handleChange} />
            <InputField label='Warning too high' type='text' id='warningTooHigh' value={formValues.warningTooHigh} onChange={handleChange} />
            <InputField label='Warning too low' type='text' id='warningTooLow' value={formValues.warningTooLow} onChange={handleChange} />
            <InputField label='Alarm too low' type='text' id='alarmTooLow' value={formValues.alarmTooLow} onChange={handleChange} />
          </>
        )}
      </FormModal>
    </>
  );
};

export default BarGauge;