import ValueFieldProps from './ValueField.types';
import './ValueField.scss';

import { useContext, useEffect, useState } from 'react';

import FormModal from '../../molecules/FormModal/FormModal';
import InputField from '../FormInputs/InputField/InputField';
import ToggleField from '../FormInputs/ToggleField/ToggleField';

import { Config } from 'src/app/configuration/types';
import { stringToBool } from 'src/app/services/stringToBool';
import { ConfigDataContext } from 'src/app/contexts/ConfigData';
import SelectField from '../FormInputs/SelectField/SelectField';
import { timeStamp } from 'console';

const ValueField: React.FC<ValueFieldProps> = ({ 
  id, 
  label = 'Label', 
  unit = 'XX', 
  requiresValueTimes = false, 
  valueTimes = 0, 
  isEditable = false, 
  dataSource = 'mqtt_topic',
  configEnabled,
  activePageId
}) => {
  const { _configData, setConfigData } = useContext(ConfigDataContext);
  const [_value, setValue] = useState('000.00');
  const [_isModalOpen, setIsModalOpen] = useState(false);
  const [_formValues, setFormValues] = useState({
    _label: label,
    _unit: unit,
    _requiresValueTimes: requiresValueTimes,
    _valueTimes: valueTimes,
    _isEditable: isEditable,
    _dataSource: dataSource
  });

  const onChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const _value = _event.target.value;

    setValue(_value);
  };

  const getCurrentTime = (_locale?: 'local_time' | 'utc_time') => {
    const _dateTime = new Date();

    if (_locale === 'utc_time') {
      return `${_dateTime.getUTCHours().toString().padStart(2, '0')}:${_dateTime.getUTCMinutes().toString().padStart(2, '0')}`;
    } else if (_locale === 'local_time') {
      return `${_dateTime.getHours().toString().padStart(2, '0')}:${_dateTime.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return '';
    };
  };

  const openModal = () => {
    if (configEnabled) {
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

    let _pageIndex = _configData.pages.findIndex((_o) => _o.id === activePageId);
    let _index = _configData.pages[_pageIndex].components.findIndex((_o) => _o.props.id === id);

    _configData.pages[_pageIndex].components[_index] = {
      type: _configData.pages[_pageIndex]?.components[_index].type,
      props: {
        ..._configData.pages[_pageIndex].components[_index].props,
        label: _formValues._label,
        unit: _formValues._unit,
        requiresValueTimes: _formValues._requiresValueTimes,
        valueTimes: Math.floor(_formValues._valueTimes),
        isEditable: stringToBool(_formValues._isEditable.toString()),
        dataSource: _formValues._dataSource
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

  const handleFormChange = (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const _name = _event.target.name;
    // Value is dependant on whether it's a checkbox or not
    const _value = _event.target.type == 'checkbox' ? _event.target.checked : _event.target.value;

    setFormValues((_prevFormValues) => ({
      ..._prevFormValues,
      [_name]: _value
    }));
  };

  useEffect(() => {
    if (dataSource === 'utc_time' || dataSource === 'local_time') {
      setValue(getCurrentTime(dataSource)); // Set first value
      // Set interval to update every 60 seconds
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
        <label className='value-field__label' htmlFor={id}>{label}</label>
        <div className='value-field__block'>
          <span>
            <input 
              type='text' 
              id={id}
              name={id}
              value={_value} 
              onChange={onChange}
              className={`value-field__input ${isEditable ? 'value-field__editable' : ''}`} 
              size={_value.length} 
              disabled={!isEditable} 
            />
            { requiresValueTimes && <div className='value-field__times'><p className='value-field__times-amount'>x {valueTimes}</p></div> }
          </span>
          <p className='value-field__unit'>{unit}</p>
        </div>
      </div>  
      <FormModal isOpen={_isModalOpen} onSubmit={submitForm} onCancel={closeModal}>
        <InputField type='text' label='Label' id='_label' value={_formValues._label} onChange={handleFormChange} />
        <InputField type='text' label='Unit' id='_unit' value={_formValues._unit} onChange={handleFormChange} />
        <ToggleField label='Value times x?' id='_requiresValueTimes' isChecked={_formValues._requiresValueTimes} onChange={handleFormChange} />
        {_formValues._requiresValueTimes && <InputField type='number' label='Value times' id='_valueTimes' value={_formValues._valueTimes} onChange={handleFormChange} />}
        <ToggleField label='Is editable?' id='_isEditable' isChecked={_formValues._isEditable} onChange={handleFormChange} />
        <SelectField label='Datasource' id='_dataSource' value={_formValues._dataSource} options={['mqtt_topic', 'utc_time', 'local_time']} onChange={handleFormChange} />
        {_formValues._dataSource === 'mqtt_topic' && < InputField type='text' label='MQTT topic' id='_mqttTopic' value='/example/topic' onChange={handleFormChange} />}
      </FormModal>
    </>  
  );
};

export default ValueField;