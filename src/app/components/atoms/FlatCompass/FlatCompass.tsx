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
  width = 5,
  height = 300,
  dataSource = 'mqtt_topic',
  mqttTopic = 'test/topic1',
  visibleDegrees = 10  
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
    visibleDegrees: visibleDegrees
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
        visibleDegrees: formValues.visibleDegrees
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
  
     
      const halfWindow = Math.floor(visibleDegrees / 2);
      const adjustedValue = (_currentValue + 360) % 360;
  
      for (let i = -halfWindow; i <= halfWindow; i++) {
        const degree = (adjustedValue + i + 360) % 360;

        // Create a div for each degree marker
        const degreeElement = document.createElement('div');
        degreeElement.classList.add('degree');

        // Apply width from the form input value
        degreeElement.style.width = `${formValues.width || 5}px`;
        
        // Display the number only if the degree is a multiple of 10
        if (degree % 10 === 0) {
          const majorTickContainer = document.createElement('div');
          majorTickContainer.classList.add('major-tick');
          
          const tickLine = document.createElement('div');
          tickLine.classList.add('major-tick-line');

          const tickText = document.createElement('div');
          tickText.classList.add('major-tick-text');
          tickText.textContent = degree.toString();

          majorTickContainer.appendChild(tickLine);
          majorTickContainer.appendChild(tickText);
          compassRef.current.appendChild(majorTickContainer);

          if (degree === _currentValue) {
            majorTickContainer.classList.add('green-tick');
          }
        } else if (degree % 5 === 0) {
          degreeElement.classList.add('medium-tick');
          if (degree === _currentValue) {
            degreeElement.classList.add('green-tick');
          }
        } else {
          degreeElement.classList.add('minor-tick');
          if (degree === _currentValue) {
            degreeElement.classList.add('green-tick');
          }
        }
  
        compassRef.current.appendChild(degreeElement);
      }
    }
  }, [_currentValue, formValues.width, formValues.visibleDegrees]); // Ensure it runs when width changes
  
  return (
    <>
      <div className="flatcompass-container" onDoubleClick={openModal}>
        <div className="fade-left"></div>
        <div className="fade-right"></div>
        <div className="flatouter-compass">
          <div id="flatcompass" ref={compassRef} className="flatcompass"></div>
        </div>
      </div>

      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal}>
        <InputField label="Element label" type="text" id="label" value={formValues.label} onChange={handleChange} />
        <InputField label="Width (px)" type="number" id="width" value={formValues.width} onChange={handleChange} />
        <InputField label="Visible Degrees" type="number" id="visibleDegrees" value={formValues.visibleDegrees} onChange={handleChange} /> 
        <SelectField label="Datasource" id="dataSource" value={formValues.dataSource.toString()} options={[{label: 'MQTT topic', value: 'mqtt_topic'}, {label: 'UTC time', value: 'utc_time'}, {label: 'Local time', value: 'local_time'}]} onChange={handleChange} />
        {formValues.dataSource === 'mqtt_topic' && (
          <PredictiveSearchField label='mqttTopic' id='mqttTopic' value={formValues.mqttTopic ? formValues.mqttTopic.toString() : ''} onChange={(newValue) => handleChange}/>
        )}
      </FormModal>
    </>
  );
};

export default FlatCompass;
