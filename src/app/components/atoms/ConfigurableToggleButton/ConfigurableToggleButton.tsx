import ConfigurableToggleButtonProps from './ConfigurableToggleButton.types';
import './ConfigurableToggleButton.scss';

import { useContext, useEffect, useState, useRef } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import SelectField from '../FormInputs/SelectField/SelectField';
import PredictiveSearchField from '../FormInputs/PredictiveSearchField/PredictiveSearchField';

import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import useFormInput from 'src/app/hooks/useFormInput';

const ConfigurableToggleButton: React.FC<ConfigurableToggleButtonProps> = ({
  id,
  label = 'Label',
  width = 130,
  height = 300,
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
    label: label,
    width: width,
    height: height,
    dataSource: dataSource,
    mqttTopic: mqttTopic,
  });
  
  const { formValues, handleChange, resetForm } = useFormInput(_initialValues);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isChecked, setIsChecked] = useState(false); // State to control toggle button


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

  
  const updateToggleButton = (value: number) => {
    setIsChecked(value === 1); // Switch on for 1, off for 0
  };

  useEffect(() => {
    if (dataSource === 'mqtt_topic') {
      ws.current = new WebSocket("ws://localhost:4000/");

      ws.current.onopen = () => {
        console.log("WebSocket connection established in toggle");
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { topic, message } = data;

        if (topic === mqttTopic) {
          console.log(`Received message on topic "${topic}": ${message}`);
          updateToggleButton(Number(message));
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed in togglebutton");
        ws.current = null;
      };

      return () => {
        ws.current?.close();
        ws.current = null;
      };
    }
  }, [dataSource, mqttTopic]);

  return (
    <>
      <div onDoubleClick={openModal} className={`toggle-button ${id}`}>
        <p className="toggle-button__label">{label}</p>
        <div className="checkbox-wrapper-8">
          <input
            type="checkbox"
            id={`cb3-8-${id}`}
            className="tgl tgl-skewed"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)} // Manually toggle state on click
          />
          <label htmlFor={`cb3-8-${id}`} data-tg-on="ON" data-tg-off="OFF" className="tgl-btn"></label>
        </div>
      </div>

      <FormModal isOpen={_isModalOpen} onSubmit={handleSubmit} onCancel={closeModal}>
        <InputField label="Element label" type="text" id="label" value={formValues.label} onChange={handleChange} />
        <InputField label="Width (px)" type="number" id="width" value={formValues.width} onChange={handleChange} />
        <InputField label="Height (px)" type="number" id="height" value={formValues.height} onChange={handleChange} />
        <SelectField label="Datasource" id="dataSource" value={formValues.dataSource.toString()} options={[{label: 'MQTT topic', value: 'mqtt_topic'}, {label: 'UTC time', value: 'utc_time'}, {label: 'Local time', value: 'local_time'}]} onChange={handleChange} />
        {formValues.dataSource === 'mqtt_topic' && < PredictiveSearchField id='mqttTopic' value={formValues.mqttTopic ? formValues.mqttTopic.toString() : ''} onChange={(newValue) => handleChange}/>}
      </FormModal>
    </>
  );
};

export default ConfigurableToggleButton;
