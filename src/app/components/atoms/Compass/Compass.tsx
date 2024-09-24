import CompassProps from './Compass.types';
import './Compass.scss';

import { useState, useEffect, useContext } from 'react';
import FormModal from '../../molecules/FormModal/FormModal';
import { ThemeContext } from '../../../contexts/Theme';
import { Config } from 'src/app/configuration/types';
import { stringToBool } from 'src/app/services/stringToBool';
import InputField from '../FormInputs/InputField/InputField';

const Compass: React.FC<CompassProps> = ({ id = '', activePageId, source = 'magn', waveArrowOutside = true, stepsOfDegrees = 30, width = 400, height = 400, configEnabled }) => {
  const [_currentHeading, setCurrentHeading] = useState(0);
  const [_windspeed, setWindspeed] = useState(5);
  const [_waveSpeed, setWaveSpeed] = useState(1);
  const [_windArrow, setWindArrow] = useState(0);
  const [_waveArrow, setWaveArrow] = useState(180);
  const [_correctData, setData] = useState('incomplete');
  const [_configData, setConfigData] = useState<Config>();
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const { _currentTheme } = useContext(ThemeContext);
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


  const generateDegreeNumbers = (_radius: number, _centerX: number, _centerY: number) => {
    const _lines: any[] = [];

    for (let i = 0; i * stepsOfDegrees < 360; i++) {
      const _angle = stepsOfDegrees * i;
      const _radian = (_angle * Math.PI) / 180;

      const _textX = _centerX + (_radius - 3) * Math.sin(_radian);
      const _textY = _centerY - (_radius - 3) * Math.cos(_radian);

      _lines.push(
        <g key={i}>
          <text
            className={`compass__degree-number compass__degree-number__${_currentTheme}`}
            x={_textX}
            y={_textY}
            textAnchor='middle'
            dominantBaseline='middle'
          >
            {_angle}
          </text>
        </g>
      );
    }

    return _lines;
  };


  const openModal = () => {
    if (configEnabled) {
      setIsModalOpen(true);
      fetch(`/api/read-json?file=config.json`)
      .then((res) => res.json())
      .then((results) => { 
        setConfigData(results);
        console.log(results)
      })
      .catch((err) => console.error(err));
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


  const handleSave = () => {
    if (_configData === undefined) {
      return;
    }

    
    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);
    console.log(id)
    console.log(_configData.pages[_pageIndex]?.components[_index])

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        source: _formValues.source,
        width: parseInt(_formValues.width),
        height: parseInt(_formValues.height),
        stepsOfDegrees: parseInt(_formValues.stepsOfDegrees),
        waveArrowOutside: stringToBool(_formValues.waveArrowOutside)
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
  };


  useEffect(() => {
    const _interval = setInterval(() => {
      setCurrentHeading(_prevHeading => (_prevHeading + 5));
      setWindspeed(_prevWindSpeed => _prevWindSpeed + 1);
      setWindArrow(_prevWindArrow => (_prevWindArrow + 5));
      setWaveSpeed(_prevWaveSpeed => _prevWaveSpeed + 1);
      setWaveArrow(_prevWaveArrow => (_prevWaveArrow + 5));
    }, 500)

    return () => clearInterval(_interval);
  }, []);


  useEffect(() => {
    if (_correctData == 'incomplete') {
      setTimeout(() => {
        setData('correct');
      }, 5000);
    } else {
      update(`hdg-${id}`, _currentHeading);
      update(`cog-${id}`, _currentHeading + 20);
      update(`outer-circle-${id}`, _currentHeading);
    };
  }, [_currentHeading]);


  useEffect(() => {
    if (_waveSpeed >= 4) {
      setWaveSpeed(1);
    }
  }, [_waveSpeed]);

  useEffect(() => {
    if (_waveArrow > 360) {
      setWaveArrow(0);
    }
    update('wave', _waveArrow);
  }, [_waveArrow]);

  useEffect(() => {
    if (_windArrow > 360) {
      setWindArrow(0);
    }
    update('wind-speed', _windArrow);
  }, [_windArrow]);

  useEffect(() => {
    if (_windspeed >= 13) {
      setWindspeed(1);
    }
  }, [_windspeed]);


  return (
    <>
      <div key={id} onDoubleClick={openModal}>
        <svg width={width} height={height} viewBox='0 0 400 400'>
          <path className='shadow' d='M360 200C360 288.366 288.366 360 200 360C111.634 360 40 288.366 40 200C40 111.634 111.634 40 200 40C288.366 40 360 111.634 360 200ZM72.4126 200C72.4126 270.465 129.535 327.587 200 327.587C270.465 327.587 327.587 270.465 327.587 200C327.587 129.535 270.465 72.4126 200 72.4126C129.535 72.4126 72.4126 129.535 72.4126 200Z' />
          <g id={`outer-circle-${id}`} className='compass__outer-circle'>
            <path d='M360 200C360 288.366 288.366 360 200 360C111.634 360 40 288.366 40 200C40 111.634 111.634 40 200 40C288.366 40 360 111.634 360 200ZM72.4126 200C72.4126 270.465 129.535 327.587 200 327.587C270.465 327.587 327.587 270.465 327.587 200C327.587 129.535 270.465 72.4126 200 72.4126C129.535 72.4126 72.4126 129.535 72.4126 200Z' />
          </g>

          <g className='compass__degree-numbers'>
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

          <g id='wind-speed'>
            <image href={`./icons/wind/windspeed-${_windspeed}.svg`} x='188' y='10' />
          </g>

          <g id='wave'>
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
              <stop offset='0.5' stopColor='#138517'/>
              <stop offset='0.5' stopColor='#851111'/>
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