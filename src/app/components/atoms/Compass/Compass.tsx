import React, { useState, useEffect, useContext } from "react";

import CompassProps from './Compass.types';
import './Compass.scss';
import FormModal from "../../molecules/FormModal/FormModal";
import Input from "../Input/Input";
import { ThemeContext } from "../../../contexts/Theme";
import { Config } from "src/app/configuration/types";
import { stringToBool } from "src/app/services/stringToBool";

const Compass: React.FC<CompassProps> = ({ id, source, waveArrowOutside, stepsOfDegrees, configEnabled }) => {
  const [_currentHeading, setCurrentHeading] = useState(0);
  const [_windspeed, setWindspeed] = useState('5');
  const [_current, setCurrent] = useState('2');
  const [_correctData, setData] = useState('incomplete');
  const [_configData, setConfigData] = useState<Config>();
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const { _currentTheme } = useContext(ThemeContext);
  const [_formValues, setFormValues] = useState({
    source: source,
    waveArrowOutside: waveArrowOutside,
    stepsOfDegrees: stepsOfDegrees
  });


  const update = (_elementToSelect: string, _updatedValue: number) => {
    let _element = document.getElementById(_elementToSelect);
    _element?.setAttribute("transform", `rotate(${_updatedValue}, 200, 200)`)
  };


  const generateWindRoseLines = (_radius: number, _centerX: number, _centerY: number) => {
    const _lines: any[] = [];

    for (let i = 0; i * stepsOfDegrees < 360; i++) {
      const _angle = stepsOfDegrees * i;
      const _radian = (_angle * Math.PI) / 180;

      const _x1 = _centerX + (_radius - 5) * Math.sin(_radian);
      const _y1 = _centerY - (_radius - 5) * Math.cos(_radian);
      const _x2 = _centerX + (_radius + 5) * Math.sin(_radian);
      const _y2 = _centerY - (_radius + 5) * Math.cos(_radian);

      const _textX = _centerX + (_radius + 25) * Math.sin(_radian);
      const _textY = _centerY - (_radius + 25) * Math.cos(_radian);

      _lines.push(
        <g key={i}>
          <line
            className={`compass-windrose-line compass-windrose-line__${_currentTheme}`}
            x1={_x1}
            y1={_y1}
            x2={_x2}
            y2={_y2}
          />
          <text
            className={`compass-windrose-text compass-windrose-text__${_currentTheme}`}
            x={_textX}
            y={_textY}
            textAnchor="middle"
            dominantBaseline="middle"
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
      fetch("/api/read-json")
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

    let _index = _configData[0].components.findIndex((_o) => _o.props.id === id);

    _configData[0].components[_index] = {
      type: _configData[0]?.components[_index].type,
      props: {
        ..._configData[0].components[_index].props,
        source: _formValues.source,
        stepsOfDegrees: parseInt(_formValues.stepsOfDegrees),
        waveArrowOutside: stringToBool(_formValues.waveArrowOutside)
      }
    };

    fetch("/api/write-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_configData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => console.error("Error saving data:", error));
  };


  useEffect(() => {
    update('wind-speed', 320);
    update('current', 243);

    const _interval = setInterval(() => {
      setCurrentHeading(_prevHeading => (_prevHeading + 5));
    }, 500)

    return () => clearInterval(_interval);
  }, []);


  useEffect(() => {
    if (_correctData == 'incomplete') {
      setTimeout(() => {
        setData("correct");
      }, 5000);
      // console.log('There is data missing, please check the data source.');
    } else {
      update('hdg', _currentHeading);
      update('cog', _currentHeading + 20);
    };
  }, [_currentHeading]);


  return (
    <>
      <div key={id} onDoubleClick={openModal}>
        <svg width="400" height="400">
          <circle className={`compass-windrose compass-windrose__${_currentTheme}`} cx="200" cy="200" r="150" />

          <g className={`compass-inner-windrose-lines__${_currentTheme}`}>
            <line x1="70" y1="200" x2="330" y2="200" />
            <line x1="200" y1="70" x2="200" y2="330" />
          </g>

          <g id="hdg">
            <path className={`compass-ship compass-ship__${_currentTheme}`} d="M 180 120 L 180 335 L 220 335 L 220 120 C 220 93 206 65 200 65 C 194 65 180 93 180 120 Z" />
          </g>

          <g id="cog" className={`compass-cog compass-cog__${_currentTheme}`}>
            <line x1="200" y1="70" x2="200" y2="200" />
            <polygon points="200,60 210,80 190,80" />
            <circle cx="200" cy="200" r="5" />
          </g>

          <g id='wind-speed'>
            <image href={`./icons/wind/windspeed-${_windspeed}.svg`} x="188" y="0" />
          </g>

          <g id='current'>
            {waveArrowOutside 
              ? <image href={`./icons/current/outside/current-${_current}.svg`} x="188" y="0" />
              : <image href={`./icons/current/inside/current-${_current}.svg`} x="188" y="70" />
            }
          </g>

          <g className="compass-windrose-lines" fontSize="12">
            {generateWindRoseLines(150, 200, 200)}
          </g>
          {_correctData == "incomplete" && <text x="200" y="250" className="alert" textAnchor="middle" fontSize={35}>!</text>}

          <g>
            <rect className={`compass-source compass-source__${_currentTheme}`} width="70" height="20" x="0" y="370" />
            <text className={`compass-source-text compass-source-text__${_currentTheme}`} x="35" y="385" textAnchor="middle">{ source }</text>
          </g>
        </svg>
      </div>
      <FormModal isOpen={_isModalOpen} onClose={closeModal} cancelText="Discard changes" submitText="Save changes">
        <Input type="text" label="Source" value={_formValues.source} id="source" name="source" onChange={handleFormChange} />
        <Input type="number" label="Steps of degrees" value={_formValues.stepsOfDegrees} id="stepsOfDegrees" name="stepsOfDegrees" onChange={handleFormChange} />
        <Input type="text" label="Wave arrow outside?" value={_formValues.waveArrowOutside} id="waveArrowOutside" name="waveArrowOutside" onChange={handleFormChange} />
      </FormModal>
    </>
  );
};

export default Compass;