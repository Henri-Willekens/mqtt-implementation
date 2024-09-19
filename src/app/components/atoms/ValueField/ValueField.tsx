import ValueFieldProps from './ValueField.types';
import './ValueField.scss';

import { useState } from 'react';

const ValueField: React.FC<ValueFieldProps> = ({ label, id, unit, requiresValueTimes, valueTimes, isEditable }) => {
  const [value, setValue] = useState('203.00');

  const onChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    const _value = _event.target.value;

    setValue(_value);
  };

  return (
    <div className='value-field__field'>
      <label className='value-field__label' htmlFor={id}>{label}</label>
      <div className='value-field__block'>
        <span>
          <input 
            type='text' 
            id={id}
            name={id}
            value={value} 
            onChange={onChange}
            className={`value-field__input ${isEditable ? 'value-field__editable' : ''}`} 
            size={value.length} 
            disabled={!isEditable} 
          />
          { requiresValueTimes && <div className='value-field__times'><p className='value-field__times-amount'>x {valueTimes}</p></div> }
        </span>
        <p className='value-field__unit'>{unit}</p>
      </div>
    </div>    
  );
};

export default ValueField;