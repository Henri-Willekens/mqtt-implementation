import ValueFieldProps from './ValueField.types';
import './ValueField.scss';

import { useContext, useEffect, useState, useRef } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import ToggleField from '../FormInputs/ToggleField/ToggleField';
import SelectField from '../FormInputs/SelectField/SelectField';

import { stringToBool } from 'src/app/services/stringToBool';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import { ActivePageIdContext } from 'src/app/contexts/ActivePageId';
import { ConfigEnabledContext } from 'src/app/contexts/ConfigEnabled';
import { CurrentThemeContext } from 'src/app/contexts/CurrentTheme';
import useFormInput from 'src/app/hooks/useFormInput';

const ValueField: React.FC<ValueFieldProps> = ({ 
  id, 
  label = 'Label', 
  unit = 'XX', 
  requiresValueTimes = false, 
  valueTimes = 0, 
  isEditable = false, 
  dataSource = 'mqtt_topic',
  mqttTopic = '/example/topic'
}) => {
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const { _activePageId } = useContext(ActivePageIdContext);
  const { _configEnabled } = useContext(ConfigEnabledContext);
  const { _currentTheme } = useContext(CurrentThemeContext);
  
  //const [outerCircle, setOuterCircle] = useState<number | null>(0);
  const ws = useRef<WebSocket | null>(null);
  const [_value, setValue] = useState('000.00');
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_initialValues, setInitialValues] = useState({
    label: label,
    unit: unit,
    requiresValueTimes: requiresValueTimes,
    valueTimes: valueTimes,
    isEditable: isEditable,
    dataSource: dataSource,
    mqttTopic: mqttTopic
  });
  const { formValues, handleChange } = useFormInput(_initialValues);

  const onChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const _value = _event.target.value;

    setValue(_value);
  };

  const getCurrentTime = (_locale?: 'local_time' | 'utc_time') => {
    const _dateTime = new Date();

    if (_locale === 'utc_time') {
      const hh = _dateTime.getUTCHours().toString().padStart(2, '0');
      const mm = _dateTime.getUTCMinutes().toString().padStart(2, '0');
      return `${hh}:${mm}`;
    } else if (_locale === 'local_time') {
      const hh = _dateTime.getHours().toString().padStart(2, '0');
      const mm = _dateTime.getMinutes().toString().padStart(2, '0');
      return `${hh}:${mm}`;
    } else {
      return '';
    };
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
  }

  const submitForm = () => {
    handleSave();
    closeModal();
  };

  const handleSave = () => {
    if (_configData === undefined || _configData === null) {
      return;
    }

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === _activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        label: formValues.label,
        unit: formValues.unit,
        requiresValueTimes: formValues.requiresValueTimes,
        valueTimes: Math.floor(parseInt(formValues.valueTimes.toString())),
        isEditable: stringToBool(formValues.isEditable.toString()),
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
  };
  
  useEffect(() => {
    if (dataSource === 'mqtt_topic') {
        // Connect to the WebSocket server in ValueField
        ws.current = new WebSocket("ws://localhost:4000");
    
        ws.current.onopen = () => {
          console.log("WebSocket connection established in ValueField");
        };
    
        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const { topic, message } = data;
    
          if (topic === mqttTopic) {
            console.log(`Received message on topic "${topic}": ${message}`);
            setValue(message); // Convert to number and set state
          } }
        
    
        ws.current.onclose = () => {
          console.log("WebSocket connection closed in ValueField");
        };
    
        // Cleanup function to close WebSocket connection when component unmounts
        return () => {
          ws.current?.close();
        };
    };
  }, [])

  useEffect(() => {
    if (dataSource === 'utc_time' || dataSource === 'local_time') {
      setValue(getCurrentTime(dataSource)); // Set first value
      // Set interval to update every second
      const interval = setInterval(() => {
        setValue(getCurrentTime(dataSource));
      }, 1000);
  
      return () => clearInterval(interval); // Clean up on unmount
    } else if (dataSource === 'mqtt_topic') {
      // Subscribe to MQTT topic
    }
  }, []);

  return (
    <>
      <div onDoubleClick={openModal} className='value-field__field'>
        <label className={`value-field__label value-field__label__${_currentTheme}`} htmlFor={id}>{label}</label>
        <div className='value-field__block'>
          <span>
            <input 
              type='text' 
              id={id}
              name={id}
              value={_value} 
              onChange={onChange}
              className={`value-field__input value-field__input__${_currentTheme} ${isEditable ? 'value-field__editable' : ''}`} 
              size={_value.length} 
              disabled={!isEditable} 
            />
          </span>
          <p className={`value-field__unit value-field__unit__${_currentTheme}`}>{requiresValueTimes && 'x' + valueTimes} {unit}</p>
        </div>
      </div>  
      <FormModal isOpen={_isModalOpen} onSubmit={submitForm} onCancel={closeModal}>
        <InputField type='text' label='Label' id='label' value={formValues.label} onChange={handleChange} />
        <InputField type='text' label='Unit' id='unit' value={formValues.unit} onChange={handleChange} />
        <ToggleField label='Value times x?' id='requiresValueTimes' isChecked={stringToBool(formValues.requiresValueTimes.toString())} onChange={handleChange} />
        {formValues.requiresValueTimes && <InputField type='number' label='Value times' id='valueTimes' value={formValues.valueTimes} onChange={handleChange} />}
        <ToggleField label='Is editable?' id='isEditable' isChecked={stringToBool(formValues.isEditable.toString())} onChange={handleChange} />
        <SelectField 
          label='Datasource' 
          id='dataSource' 
          value={formValues.dataSource.toString()} 
          options={[{label: 'MQTT topic', value: 'mqtt_topic'}, {label: 'UTC time', value: 'utc_time'}, {label: 'Local time', value: 'local_time'}]} 
          onChange={handleChange} 
        />
        {formValues.dataSource === 'mqtt_topic' && < InputField type='text' label='MQTT topic' id='mqttTopic' value={formValues.mqttTopic  } onChange={handleChange} />}
      </FormModal>
    </>  
  );
};

export default ValueField;