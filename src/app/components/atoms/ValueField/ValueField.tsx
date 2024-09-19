import ValueFieldProps from './ValueField.types';
import './ValueField.scss';

const ValueField: React.FC<ValueFieldProps> = ({ label, unit, requiresValueTimes, valueTimes }) => {
  const isEdit = false;

  return (
    <div className='value-field__field'>
      <p className='value-field__label'>{label}</p>
      <div className='value-field__block'>
      <input type='text' value='203' className='value-field__input' disabled={!isEdit} />
      <p className='value-field__unit'>{unit}</p>
      </div>
      {requiresValueTimes && <p>{valueTimes}</p>}
    </div>    
  );
};

export default ValueField;