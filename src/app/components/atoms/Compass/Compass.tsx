import './Compass.scss';
import CompassProps from './Compass.types';

import { useState, useEffect, useContext } from 'react';

import InputField from '../FormInputs/InputField/InputField';
import FormModal from '../../molecules/FormModal/FormModal';

import { stringToBool } from 'src/app/services/stringToBool';
import { ThemeContext } from '../../../contexts/Theme';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';

const Compass: React.FC<CompassProps> = ({ 
  id = '', 
  source = 'magn', 
  waveArrowOutside = true,
  stepsOfDegrees = 30, 
  width = 400, 
  height = 400, 
  configEnabled,
  activePageId
}) => {
  const { _currentTheme } = useContext(ThemeContext);
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const [_currentHeading, setCurrentHeading] = useState(0);
  const [_windspeed, setWindspeed] = useState(5);
  const [_waveSpeed, setWaveSpeed] = useState(1);
  const [_windArrow, setWindArrow] = useState(0);
  const [_waveArrow, setWaveArrow] = useState(180);
  const [_dataComplete, setData] = useState('incomplete');
  const [_isNorthLocked, setIsNorthLocked] = useState(false);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValues, setFormValues] = useState({
    source: source,
    waveArrowOutside: waveArrowOutside,
    width: width,
    height: height,
    stepsOfDegrees: stepsOfDegrees
  });


  const update = (_elementToSelect: string, _updatedValue: number) => {
    let _element = document.getElementById(_elementToSelect);
    _element?.setAttribute('transform', `rotate(${_updatedValue}, 200, 200)`)
  };

    // Function to generate degree numbers ensuring they always face upright
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
  

  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
    };
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitForm = () => {
    handleSave();
    closeModal();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _name = event.target.name;
    const _value = event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };

  const switchNorthLock = () => {
    if (!configEnabled) {
      setIsNorthLocked(!_isNorthLocked);
    }
  }


  const handleSave = () => {
    if (_configData === null) {
      return;
    }

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        source: _formValues.source,
        width: Math.floor(_formValues.width),
        height: Math.floor(_formValues.height),
        stepsOfDegrees: Math.floor(_formValues.stepsOfDegrees),
        waveArrowOutside: stringToBool(_formValues.waveArrowOutside.toString())
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
  };


  useEffect(() => {
    // Mimic data changing
    if (!configEnabled) {
      const _interval = setInterval(() => {
        setCurrentHeading(_prevHeading => (_prevHeading == 360 ? 0 : _prevHeading + 5));
        setWindspeed(_prevWindSpeed => (_prevWindSpeed == 13 ? 1 : _prevWindSpeed + 1));
        setWindArrow(_prevWindArrow => (_prevWindArrow == 360 ? 0 : _prevWindArrow + 5));
        setWaveSpeed(_prevWaveSpeed => (_prevWaveSpeed == 4 ? 1 : _prevWaveSpeed + 1));
        setWaveArrow(_prevWaveArrow => (_prevWaveArrow == 360 ? 0 : _prevWaveArrow + 5));
      }, 500)

      return () => clearInterval(_interval);
    }
  }, []);

  useEffect(() => {
    if (!configEnabled) {
      if (_dataComplete == 'incomplete') {
        setTimeout(() => {
          setData('correct');
        }, 5000);
      } else if(!_isNorthLocked) { 
        update(`hdg-${id}`, _currentHeading);
        update(`cog-${id}`, _currentHeading + 20);
        update(`outer-circle-${id}`, _currentHeading);
        update(`degree-numbers-${id}`, 0);
      } else {
        update(`cog-${id}`, 0);
        update(`hdg-${id}`, 0);
        update(`outer-circle-${id}`, 0);
        update(`degree-numbers-${id}`, _currentHeading);
      };
    }
  }, [_currentHeading]);

  useEffect(() => {
    if (!configEnabled) { update(`wave-${id}`, _waveArrow) };
  }, [_waveArrow]);

  useEffect(() => {
    if (!configEnabled) { update(`wind-speed-${id}`, _windArrow) };
  }, [_windArrow]);

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
            <image href={`./icons/wind/windspeed-${_windspeed}.svg`} x='188' y='10' />
          </g>

          <g id={`wave-${id}`}>
            {waveArrowOutside 
              ? <image href={`./icons/wave/outside/wave-${_waveSpeed}.svg`} x='188' y='10' />
              : <image href={`./icons/wave/inside/wave-${_waveSpeed}.svg`} x='188' y='60' />
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
      <FormModal isOpen={_isModalOpen} onSubmit={submitForm} onCancel={closeModal}>
        <InputField label='Source' type='text' id='source' value={_formValues.source} onChange={handleFormChange} />
        <InputField label='Steps of degrees' type='number' id='stepsOfDegrees' value={_formValues.stepsOfDegrees} onChange={handleFormChange} />
        <InputField label='Width (px)' type='number' id='width' value={_formValues.width} onChange={handleFormChange} />
        <InputField label='Height (px)' type='number' id='height' value={_formValues.height} onChange={handleFormChange} />
        <InputField label='Wave arrow outside?' type='text' id='waveArrowOutside' value={_formValues.waveArrowOutside} onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default Compass;