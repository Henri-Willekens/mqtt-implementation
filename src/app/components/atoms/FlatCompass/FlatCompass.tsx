import FlatCompassProps from './FlatCompass.types';
import './FlatCompass.scss';
import { useContext, useEffect, useState, useRef } from 'react';
import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import SelectField from '../FormInputs/SelectField/SelectField';
import PredictiveSearchField from '../FormInputs/PredictiveSearchField/PredictiveSearchField';

import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import useFormInput from 'src/app/hooks/useFormInput';

const FlatCompass: React.FC<FlatCompassProps> = ({
  id,
  label = 'Label',
  width = 130,
  height = 300,
  dataSource = 'mqtt_topic',
  mqttTopic = 'test/topic1'
}) => {
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _activePageId } = useContext(ActivePageIdContext);

  const ws = useRef<WebSocket | null>(null);
  const compassRef = useRef<HTMLDivElement | null>(null);
  const [_currentValue, setCurrentValue] = useState(0);
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    label: label,
    width: width,
    height: height,
    dataSource: dataSource,
    mqttTopic: mqttTopic,
  });

  const { formValues, handleChange, resetForm } = useFormInput(_initialValues);

  const openModal = () => {
    if (_configEnabled) {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = () => {
    if (_configData === undefined || _configData === null) return;

    const _pageIndex = _configData.pages.findIndex((_o) => _o.id === _activePageId);
    const _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex].components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        label: formValues.label,
        width: formValues.width,
        height: formValues.height,
        dataSource: formValues.dataSource,
        mqttTopic: formValues.mqttTopic,
      },
    };

    fetch('/api/write-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_configData),
    })
      .then((_response) => _response.json())
      .catch((_error) => console.error('Error saving data:', _error));

    closeModal();
  };

  // Manage WebSocket connection and incoming messages
  useEffect(() => {
    if (dataSource === 'mqtt_topic') {
      ws.current = new WebSocket("ws://localhost:4000");

      ws.current.onopen = () => {
        console.log("WebSocket connection established in FlatCompass");
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { topic, message } = data;

        if (topic === mqttTopic) {
          console.log(`Received message on topic "${topic}": ${message}`);
          setCurrentValue(Number(message));
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed in FlatCompass");
        ws.current = null;
      };

      return () => {
        ws.current?.close();
        ws.current = null;
      };
    }
  }, [mqttTopic]);

  useEffect(() => {
    if (compassRef.current) {
      // Clear existing degrees to avoid duplicate entries
      compassRef.current.innerHTML = '';
  
      const visibleDegrees = 21; // Center degree + 10 on each side
      const halfWindow = Math.floor(visibleDegrees / 2);
  
      // Create the outermost degree element with a faded effect
      const outerDegree = (_currentValue + halfWindow + 360) % 360;
      const outerDegreeElement = document.createElement('div');
      outerDegreeElement.classList.add('outer-degree');
      outerDegreeElement.textContent = outerDegree.toString();
      compassRef.current.appendChild(outerDegreeElement);
  
      for (let i = -halfWindow; i <= halfWindow; i++) {
        const degree = (_currentValue + i + 360) % 360;
        const degreeElement = document.createElement('div');
        degreeElement.classList.add('degree');
        degreeElement.textContent = degree.toString();
        compassRef.current.appendChild(degreeElement);
      }
  
      // Smooth scrolling using CSS transition
      compassRef.current.style.transition = 'transform 0.3s ease-in-out';
      compassRef.current.style.transform = `translateX(-${halfWindow * 60}px)`; // Adjust based on marker width
    }
  }, [_currentValue]);

  return (
    <>
      <div className="compass-container" onDoubleClick={openModal}>
        <div className="outer-compass">
          <div id="compass" ref={compassRef} className="compass"></div>
        </div>
      </div>

      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal}>
        <InputField label="Element label" type="text" id="label" value={formValues.label} onChange={handleChange} />
        <InputField label="Width (px)" type="number" id="width" value={formValues.width} onChange={handleChange} />
        <InputField label="Height (px)" type="number" id="height" value={formValues.height} onChange={handleChange} />
        <SelectField label="Datasource" id="dataSource" value={formValues.dataSource.toString()} options={['mqtt_topic', 'utc_time', 'local_time']} onChange={handleChange} />
        {formValues.dataSource === 'mqtt_topic' && (
          <PredictiveSearchField id='mqttTopic' value={formValues.mqttTopic ? formValues.mqttTopic.toString() : ''} onChange={(newValue) => handleChange({ target: { name: 'mqttTopic', value: newValue } })}/>
        )}
      </FormModal>
    </>
  );
};

export default FlatCompass;
