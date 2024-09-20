import React, { useState, useEffect, useContext } from 'react';

import CompassProps from './Compass.types';
import './Compass.scss';
import FormModal from '../../molecules/FormModal/FormModal';
import Input from '../Input/Input';
import { ThemeContext } from '../../../contexts/Theme';
import { Config } from 'src/app/configuration/types';
import { stringToBool } from 'src/app/services/stringToBool';

const Compass: React.FC<CompassProps> = ({ id, activePageId, source, waveArrowOutside, stepsOfDegrees, width, height, configEnabled }) => {
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
      .then((result) => {
        console.log(result.message);
      })
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
      // console.log('There is data missing, please check the data source.');
    } else {
      update('hdg', _currentHeading);
      update('outer-circle', _currentHeading);
      update('cog', _currentHeading + 20);
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
          <g id='outer-circle' className='compass__outer-circle'>
            <path d='M360 200C360 288.366 288.366 360 200 360C111.634 360 40 288.366 40 200C40 111.634 111.634 40 200 40C288.366 40 360 111.634 360 200ZM72.4126 200C72.4126 270.465 129.535 327.587 200 327.587C270.465 327.587 327.587 270.465 327.587 200C327.587 129.535 270.465 72.4126 200 72.4126C129.535 72.4126 72.4126 129.535 72.4126 200Z' />
          </g>

          <g className='compass__degree-numbers'>
            {generateDegreeNumbers(150, 200, 200)}
          </g>

          <g className='compass__inner-circle'>
            <circle cx='200' cy='200' r='130' fill='url(#paint1_linear_988_2110)' />
          </g>

          <g id='hdg'>
            <path className={`compass__hdg compass__hdg__${_currentTheme}`} d='M181.204 160.591C181.943 123.981 194.471 84.9312 203.316 84.9312C212.602 84.9312 226.191 122.761 225.427 160.591L225.427 313.486C225.427 320.211 225.427 320.211 220.12 320.211L186.511 320.211C181.204 320.211 181.204 320.211 181.204 313.487L181.204 160.591Z' fill='#353548' stroke='#EFEFEF' />
          </g>

          <g id='cog' className={`compass__cog compass__cog__${_currentTheme}`}>
            <path d='M203 70L194.34 85H211.66L203 70ZM204.5 203V198.25H201.5V203H204.5ZM204.5 188.75V179.25H201.5V188.75H204.5ZM204.5 169.75V160.25H201.5V169.75H204.5ZM204.5 150.75V141.25H201.5V150.75H204.5ZM204.5 131.75V122.25H201.5V131.75H204.5ZM204.5 112.75V103.25H201.5V112.75H204.5ZM204.5 93.75V84.25H201.5V93.75H204.5Z' />
          </g>
          <g className={`compass__center compass__center__${_currentTheme}`}>
            <circle cx='203' cy='203' r='10' />
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
              <stop offset='0.15' stopColor='#343453' />
              <stop offset='1' stopColor='#181822' />
            </linearGradient>
            <linearGradient id='paint1_linear_988_2110' x1='200' y1='70' x2='200' y2='330' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#343453' />
              <stop offset='1' stopColor='#7474B9' />
            </linearGradient>
            <linearGradient xmlns='http://www.w3.org/2000/svg' id='paint0_linear_1210_582' x1='77' y1='165' x2='327' y2='165' gradientUnits='userSpaceOnUse'>
              <stop offset='0.5' stopColor='#138517' />
              <stop offset='0.5' stopColor='#851111' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onClose={closeModal} cancelText='Discard changes' submitText='Save changes'>
        <Input type='text' label='Source' value={_formValues.source} id='source' name='source' onChange={handleFormChange} />
        <Input type='number' label='Steps of degrees' value={_formValues.stepsOfDegrees} id='stepsOfDegrees' name='stepsOfDegrees' onChange={handleFormChange} />
        <Input type='number' label='Width' value={_formValues.width} id='width' name='width' onChange={handleFormChange} />
        <Input type='number' label='Height' value={_formValues.height} id='height' name='height' onChange={handleFormChange} />
        <Input type='text' label='Wave arrow outside?' value={_formValues.waveArrowOutside} id='waveArrowOutside' name='waveArrowOutside' onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default Compass;