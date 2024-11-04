import './Compass.scss';
import CompassProps from './Compass.types';

import { useState, useEffect, useContext, useRef } from 'react';

import InputField from '../FormInputs/InputField/InputField';
import FormModal from '../../molecules/FormModal/FormModal';
import ToggleField from '../FormInputs/ToggleField/ToggleField';
import SelectField from '../FormInputs/SelectField/SelectField';
import PredictiveSearchField from '../FormInputs/PredictiveSearchField/PredictiveSearchField';

import { stringToBool } from 'src/app/services/stringToBool';
import { CurrentThemeContext } from '../../../contexts/CurrentTheme';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import useFormInput from 'src/app/hooks/useFormInput';

const Compass: React.FC<CompassProps> = ({ 
  id = '', 
  source = 'magn', 
  waveArrowOutside = true,
  stepsOfDegrees = 30, 
  width = 400, 
  height = 400,
  dataSource = 'mqtt_topic',
  mqttTopic = '/example/topic',
  mqttCogTopic = '/example/topic',
  mqttWaveTopic = '/example/topic', 
  mqttWindTopic = '/example/topic'
}) => {
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activePageId } = useContext(ActivePageIdContext);
  const { _currentTheme } = useContext(CurrentThemeContext);
  const ws = useRef<WebSocket | null>(null);
  
  // Mocked data
  const [_currentHeading, setCurrentHeading] = useState(0);
  const [_cog, setCog] = useState(0);
  const [_windspeed, setWindspeed] = useState(5);
  const [_waveSpeed, setWaveSpeed] = useState(1);
  const [_windArrow, setWindArrow] = useState(0);
  const [_waveArrow, setWaveArrow] = useState(180);
  const [_dataComplete, setData] = useState('incomplete');

  const [_isNorthLocked, setIsNorthLocked] = useState(false);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    source: source,
    waveArrowOutside: waveArrowOutside,
    width: width,
    height: height,
    stepsOfDegrees: stepsOfDegrees,
    dataSource: dataSource,
    mqttTopic: mqttTopic,
    mqttCogTopic: mqttCogTopic, 
    mqttWaveTopic: mqttWaveTopic, 
    mqttWindTopic: mqttWindTopic 
  });
  const { formValues, handleChange, resetForm } = useFormInput(_initialValues);


  const update = (elementToSelect: string, updatedValue: number) => {
    let element = document.getElementById(elementToSelect);
    element?.setAttribute('transform', `rotate(${updatedValue}, 200, 200)`)
  };

  const generateDegreeNumbers = (_radius: number, _centerX: number, _centerY: number) => {
    const _lines: any[] = [];
    
    for (let i = 0; i * stepsOfDegrees < 360; i++) {
      const _angle = stepsOfDegrees * i; // The angle at which each number is positioned
      const _radian = (_angle * Math.PI) / 180;

      const _textX = _centerX + (_radius - 3) * Math.sin(_radian);
      const _textY = _centerY - (_radius - 3) * Math.cos(_radian);

      // Counter-rotation: Rotate number to always face upright
      const _counterRotation = -_currentHeading;
      
      _lines.push(
        <text
          key={i}
          className={`compass__degree-number compass__degree-number__${_currentTheme}`}
          x={_textX}
          y={_textY}
          textAnchor="middle"
          dominantBaseline="central"
          transform={!_isNorthLocked ? '' : `rotate(${_counterRotation}, ${_textX}, ${_textY})`} // Rotate to stay upright
        >
          {_angle}
        </text>
      );
    }
    return _lines;
  };

  const switchNorthLock = () => {
    if (!_configEnabled) {
      setIsNorthLocked(!_isNorthLocked);
    }
  }
  
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
    if (_configData === null) {
      return;
    }

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === _activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        source: formValues.source,
        width: Math.floor(parseInt(formValues.width.toString())),
        height: Math.floor(parseInt(formValues.height.toString())),
        stepsOfDegrees: Math.floor(parseInt(formValues.stepsOfDegrees.toString())),
        waveArrowOutside: stringToBool(formValues.waveArrowOutside.toString()),
        dataSource: formValues.dataSource,
        mqttTopic: formValues.mqttTopic,  // Heading
        mqttCogTopic: formValues.mqttCogTopic,  // COG
        mqttWaveTopic: formValues.mqttWaveTopic,  // Wave
        mqttWindTopic: formValues.mqttWindTopic  // Wind
      }
    };

    fetch('/api/write-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(_configData),
    })
      .then((response) => {
        response.json();
        setConfigData(_configData);
      })
      .catch((error) => console.error('Error saving data:', error));

    closeModal();
  };

  



  useEffect(() => {
    if (dataSource === 'mqtt_topic') {
      ws.current = new WebSocket("ws://localhost:4000");
      ws.current.onopen = () => {
        console.log("WebSocket connection established in Compass");
      };
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { topic, message } = data;

        if (topic === mqttTopic) {
          setCurrentHeading(Number(message)); 
        } if (topic === mqttWindTopic) {
          setWindArrow(Number(message));
        } if (topic === mqttWaveTopic) {
          setWaveArrow(Number(message));
        } if (topic === mqttCogTopic) { 
          setCog(Number(message));
      }
      };
      ws.current.onclose = () => {
        console.log("WebSocket connection closed in Compass");
      };

      return () => {
        ws.current?.close();
      };
    }
  }, [dataSource, mqttTopic, mqttWindTopic, mqttWaveTopic, mqttCogTopic]);

  useEffect(() => {
    if(!_isNorthLocked) { 
        update(`hdg-${id}`, _currentHeading);
        update(`cog-${id}`, _cog);
        update(`outer-circle-${id}`, _currentHeading);
        update(`degree-numbers-${id}`, 0);
      } else {
        update(`cog-${id}`, 0);
        update(`hdg-${id}`, 0);
        update(`outer-circle-${id}`, 0);
        update(`degree-numbers-${id}`, _currentHeading);
      }
  }, [_currentHeading, _cog]);

  return (
    <>
      <div key={id} onClick={switchNorthLock} onDoubleClick={openModal}>
        <svg width={width} height={height} viewBox='0 0 400 400' className='compass'>
          <path className='shadow' d='M360 200C360 288.366 288.366 360 200 360C111.634 360 40 288.366 40 200C40 111.634 111.634 40 200 40C288.366 40 360 111.634 360 200ZM72.4126 200C72.4126 270.465 129.535 327.587 200 327.587C270.465 327.587 327.587 270.465 327.587 200C327.587 129.535 270.465 72.4126 200 72.4126C129.535 72.4126 72.4126 129.535 72.4126 200Z' />
          <g id={`outer-circle-${id}`} className='compass__outer-circle'>
            <path d='M360 200C360 288.366 288.366 360 200 360C111.634 360 40 288.366 40 200C40 111.634 111.634 40 200 40C288.366 40 360 111.634 360 200ZM72.4126 200C72.4126 270.465 129.535 327.587 200 327.587C270.465 327.587 327.587 270.465 327.587 200C327.587 129.535 270.465 72.4126 200 72.4126C129.535 72.4126 72.4126 129.535 72.4126 200Z' />
          </g>

          <g id={`degree-numbers-${id}`} className='compass__degree-numbers'>
            {generateDegreeNumbers(150, 200, 200)}
          </g>

          <g className='compass__inner-circle'>
            <circle cx='200' cy='200' r='130' fill='url(#paint1_linear_988_2110)' />
          </g>

          <g id={`hdg-${id}`}>
            <path className={`compass__hdg compass__hdg__${_currentTheme}`} d='M 178 160 C 178 125 192 84 201 84 C 210 84 223 125 223 160 L 223 315 C 223 320 223 320 218 320 L 184 320 C 178 320 178 320 178 315 L 178 160 Z' />
          </g>

          <g id={`cog-${id}`} className={`compass__cog compass__cog__${_currentTheme}`}>
            <path d='m 200 70 L 190 85 H 210 L 200 70 Z M 202 200 V 198 H 198 V 200 H 202 Z M 202 189 V 179 H 198 V 189 H 202 Z M 202 170 V 160 H 198 V 170 H 202 Z M 202 151 V 141 H 198 V 151 H 202 Z M 202 132 V 122 H 198 V 132 H 202 Z M 202 113 V 104 H 198 V 113 H 202 Z M 202 94 V 85 H 198 V 94 Z' />
          </g>
          <g className={`compass__center compass__center__${_currentTheme}`}>
            <circle cx='200' cy='200' r='10' />
          </g>

          <g id={`wind-speed-${id}`}>
            <image href={`./icons/wind/${_currentTheme}/windspeed-${_windspeed}.svg`} x='188' y='10' />
          </g>

          <g id={`wave-${id}`}>
            {waveArrowOutside 
              ? <image href={`./icons/wave/outside/${_currentTheme}/wave-${_waveSpeed}.svg`} x='188' y='10' />
              : <image href={`./icons/wave/inside/${_currentTheme}/wave-${_waveSpeed}.svg`} x='188' y='60' />
            }
          </g>

          <defs>
            <linearGradient id='paint0_linear_988_2110' x1='87.4667' y1='83.7333' x2='304.533' y2='325.333' gradientUnits='userSpaceOnUse'>
                <stop offset='0.15' stopColor='#343453'/>
                <stop offset='1' stopColor='#181822'/>
            </linearGradient>
            <linearGradient id='paint1_linear_988_2110' x1='200' y1='70' x2='200' y2='330' gradientUnits='userSpaceOnUse'>
                <stop stopColor='#343453'/>
                <stop offset='1' stopColor='#7474B9'/>
            </linearGradient>
            <linearGradient xmlns='http://www.w3.org/2000/svg' id='paint0_linear_1210_582' x1='77' y1='165' x2='327' y2='165' gradientUnits='userSpaceOnUse'>
              <stop offset='0.5' stopColor='#851111'/>
              <stop offset='0.5' stopColor='#138517'/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal}>
        <InputField label='Source' type='text' id='source' value={formValues.source} onChange={handleChange} />
        <InputField label='Steps of degrees' type='number' id='stepsOfDegrees' value={formValues.stepsOfDegrees} onChange={handleChange} />
        <InputField label='Width (px)' type='number' id='width' value={formValues.width} onChange={handleChange} />
        <InputField label='Height (px)' type='number' id='height' value={formValues.height} onChange={handleChange} />
        <ToggleField label='Wave arrow outside?' id='waveArrowOutside' isChecked={stringToBool(formValues.waveArrowOutside.toString())} onChange={handleChange} />
        <SelectField label='Datasource' id='dataSource' value={formValues.dataSource.toString()} options={['mqtt_topic', 'utc_time', 'local_time']} onChange={handleChange} />
        {formValues.dataSource === 'mqtt_topic' && (
          <>
          <PredictiveSearchField id='mqttTopic' value={formValues.mqttTopic ? formValues.mqttTopic.toString() : ''} onChange={(newValue) => handleChange({ target: { name: 'mqttTopic', value: newValue } })}/>
          <PredictiveSearchField id='mqttCogTopic' value={formValues.mqttCogTopic ? formValues.mqttCogTopic.toString() : ''} onChange={(newValue) => handleChange({ target: { name: 'mqttCogTopic', value: newValue } })}/>
          <PredictiveSearchField id='mqttWaveTopic' value={formValues.mqttWaveTopic ? formValues.mqttWaveTopic.toString() : ''} onChange={(newValue) => handleChange({ target: { name: 'mqttWaveTopic', value: newValue } })}/>
          <PredictiveSearchField id='mqttWindTopic' value={formValues.mqttWindTopic ? formValues.mqttWindTopic.toString() : ''} onChange={(newValue) => handleChange({ target: { name: 'mqttWindTopic', value: newValue } })}/>
          </>
        )}
     </FormModal>
    </>
  );
};

export default Compass;