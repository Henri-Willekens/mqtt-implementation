import RudderProps from './Rudder.types';
import './Rudder.scss';

import { useContext, useEffect, useState, useRef } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import SelectField from '../FormInputs/SelectField/SelectField';
import PredictiveSearchField from '../FormInputs/PredictiveSearchField/PredictiveSearchField';

import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';
import useFormInput from 'src/app/hooks/useFormInput';

const Rudder: React.FC<RudderProps> = ({ 
  id, 
  totalRudderAngle = 270, 
  width = 255, 
  height = 255, 
  stepsOfDegrees = 15, 
  dataSource = 'mqtt_topic',
  mqttTopic = '/example/topic'
}) => {
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activePageId } = useContext(ActivePageIdContext);
  const { _currentTheme } = useContext(CurrentThemeContext);
      
  const ws = useRef<WebSocket | null>(null);

  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    totalRudderAngle: totalRudderAngle,
    width: width,
    height: height,
    stepsOfDegrees: stepsOfDegrees,
    dataSource: dataSource,
    mqttTopic: mqttTopic
  });
  const { formValues, handleChange } = useFormInput(_initialValues);

  const _angle = totalRudderAngle / 2;
  const _elementRadius = 125;
  const _centerX = _elementRadius;
  const _centerY = _elementRadius;

  const determineRudderAngle = () => {
    // Calculate the endpoint of the arc for port side
    const _portAngle = _angle * Math.PI / 180;
    const _portX = _centerX + _elementRadius * Math.sin(_portAngle);
    const _portY = _centerY + _elementRadius * Math.cos(_portAngle);

    // Calculate the endpoint of the arc for starboard side
    const _starboardAngle = -_angle * Math.PI / 180;
    const _starboardX = _centerX + _elementRadius * Math.sin(_starboardAngle);
    const _starboardY = _centerY + _elementRadius * Math.cos(_starboardAngle);

    return (
      <g>
        <path className='rudder__angles__starboard' d={`M${_centerX},${_centerY} L${_centerX},${_centerY + _elementRadius} A${_elementRadius},${_elementRadius} 0 0,0 ${_portX},${_portY} Z`} />
        <path className='rudder__angles__port' d={`M${_centerX},${_centerY} L${_centerX},${_centerY + _elementRadius} A${_elementRadius},${_elementRadius} 0 0,1 ${_starboardX},${_starboardY} Z`} />
      </g>
    );
  };

  const updateRudderPosition = (updatedAngle: number) => {
    const _rudderPointer = document.getElementById('rudder-pointer');
    _rudderPointer?.setAttribute('transform', `rotate(${updatedAngle}, 125, 125)`)
  };

  const generateDegreeLabels = () => {
    let _degreeLabels: any[] = [];

    for (let i = -_angle; i <= _angle; i+= stepsOfDegrees) {
      const _radian = (i * Math.PI) / 180;

      const _textX = _centerX + (_elementRadius - 12) * -Math.sin(_radian);
      const _textY = _centerY - (_elementRadius - 12) * -Math.cos(_radian);

      const maxClass = (i == _angle || i == -_angle) ? 'rudder__angles__max': '';
      
      _degreeLabels.push(
        <text
          key={i}
          x={_textX}
          y={_textY}
          textAnchor='middle'
          dominantBaseline='middle'
          className={`rudder__angles__number rudder__angles__number__${_currentTheme} ${maxClass}`}
        >
          {i}
        </text>
      );
    };

    return _degreeLabels;
  };

  const openModal = () => {
    if (_configEnabled) {
      setIsModalOpen(true);
    };
  };


  const closeModal = () => {
    setIsModalOpen(false);
    fetch('/api/read-json?file=config.json')
      .then((res) => res.json())
      .then((results) => { 
        setConfigData(results);
      })
      .catch((err) => console.error(err));
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
        totalRudderAngle: Math.floor(parseInt(formValues.totalRudderAngle.toString())),
        stepsOfDegrees: Math.floor(parseInt(formValues.stepsOfDegrees.toString())),
        width: Math.floor(parseInt(formValues.width.toString())),
        height: Math.floor(parseInt(formValues.height.toString())),
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
      .then((response) => response.json())
      .catch((error) => console.error('Error saving data:', error));
    closeModal();
  };


  useEffect(() => {
    if (dataSource === 'mqtt_topic') {
        // Connect to the WebSocket server in rudder
        ws.current = new WebSocket("ws://localhost:4000");
    
        ws.current.onopen = () => {
          console.log("WebSocket connection established in rudder");
        };
    
        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const { topic, message } = data;
    
          if (topic === mqttTopic) {
            console.log(`Received message on topic "${topic}": ${message}`);
            updateRudderPosition(message); // Convert to number and set state
          } }
        
    
        ws.current.onclose = () => {
          console.log("WebSocket connection closed in rudder");
        };
    
        // Cleanup function to close WebSocket connection when component unmounts
        return () => {
          ws.current?.close();
        };
    };
  }, [])

  return (
    <>
      <div key={id} onDoubleClick={openModal} className='rudder'>
        <svg width={width} height={height} viewBox={`0 0 255 255`}>
          <circle cx='125' cy='125' r='125' className='rudder__outer-circle' />

          <g className='port-starboard'>
            {determineRudderAngle()}
            <g className='rudder__angles__numbers'>
              {generateDegreeLabels()}
            </g>
          </g>

          <circle cx='125' cy='125' r='100' className='rudder__inner-circle' />

          <g>
            <path className={`rudder__boat rudder__boat__${_currentTheme}`} fillRule='evenodd' clipRule='evenodd' d='M 101 28 V 137 C 101 139.761 103.239 142 106 142 H 140 C 142.761 142 145 139.761 145 137 V 28 C 138 24 131 24 123 24 C 115 24 108 24 101 28 Z' />
          </g>

          <g id='rudder-pointer' className={`rudder__pointer rudder__pointer__${_currentTheme}`}>
            <path fillRule='evenodd' clipRule='evenodd' d='M133.988 125.101C133.996 124.942 134 124.782 134 124.62C134 119.307 129.523 115 124 115C118.477 115 114 119.307 114 124.62C114 124.782 114.004 124.942 114.012 125.101H114L123.231 229L133.94 125.68C133.947 125.618 133.954 125.555 133.959 125.492L134 125.101H133.988Z' />
          </g>

          <defs>
            <linearGradient id='paint0_linear_1037_1650' x1='125' y1='24' x2='125' y2='226' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#7474B9' />
              <stop offset='1' stopColor='#343453' />
            </linearGradient>
            <linearGradient id='paint1_linear_1037_1650' x1='-4.99315' y1='129.402' x2='248.743' y2='127.681' gradientUnits='userSpaceOnUse'>
              <stop offset='0.5' stopColor='#138517' />
              <stop offset='0.5' stopColor='#851111' />
            </linearGradient>
            <linearGradient id='paint2_linear_1037_1650' x1='121.228' y1='1.67226' x2='122.522' y2='255.411' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#343453' />
              <stop offset='1' stopColor='#7474B9' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal}>
        <InputField label='Total angle' type='number' id='totalRudderAngle' value={formValues.totalRudderAngle} onChange={handleChange} />
        <InputField label='Steps of degrees' type='number' id='stepsOfDegrees' value={formValues.stepsOfDegrees} onChange={handleChange} />
        <InputField label='Width (px)' type='number' id='width' value={formValues.width} onChange={handleChange} />
        <InputField label='Height (px)' type='number' id='height' value={formValues.height} onChange={handleChange} />
        <SelectField label='Datasource' id='dataSource' value={formValues.dataSource.toString()} options={['mqtt_topic', 'utc_time', 'local_time']} onChange={handleChange} />
        {formValues.dataSource === 'mqtt_topic' && < PredictiveSearchField id='mqttTopic' value={formValues.mqttTopic ? formValues.mqttTopic.toString() : ''} onChange={(newValue) => handleChange({ target: { name: 'mqttTopic', value: newValue } })}/>}
      </FormModal>
    </>
  );
};

export default Rudder;