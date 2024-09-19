import ValueFieldProps from './ValueField.types';
import './ValueField.scss';

const ValueField: React.FC<ValueFieldProps> = ({ label, unit, requiresValueTimes, valueTimes, isEditable }) => {
  const value = '203.00';

  return (
    <div className='value-field__field'>
      <p className='value-field__label'>{label}</p>
      <div className='value-field__block'>
        <span>
          <input type='text' value={value} className={`value-field__input ${isEditable ? 'value-field__editable' : ''}`} size={value.length} disabled={!isEditable} />
          { requiresValueTimes && <div className='value-field__times'><p className='value-field__times-amount'>x {valueTimes}</p></div> }
        </span>
        <p className='value-field__unit'>{unit}</p>
      </div>
    </div>    
  );
};

export default ValueField;