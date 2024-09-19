import ValueFieldProps from './ValueField.types';
import './ValueField.scss';

const ValueField: React.FC<ValueFieldProps> = ({ label, unit, requiresValueTimes, valueTimes }) => {
  const isEdit = false;

  return (
    <div className='value-field__field'>
      <p className='value-field__label'>{label}</p>
      <div className='value-field__block'>
        <span>
          <input type='text' value='203.000' className='value-field__input' size={6} disabled={!isEdit} />
          { requiresValueTimes && <div className='value-field__times'><p className='value-field__times-amount'>x {valueTimes}</p></div> }
        </span>
        <p className='value-field__unit'>{unit}</p>
      </div>
    </div>    
  );
};

export default ValueField;