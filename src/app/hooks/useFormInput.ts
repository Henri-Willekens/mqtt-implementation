import { useState } from 'react';

const useFormInput = (_initialValues: { [key: string]: string | number | boolean; }) => {
  const [_formValues, setValues] = useState(_initialValues);

  const handleChange = (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = _event.target;
    
    // Handle checkbox separately since its value is in `checked`
    const newValue = type === 'checkbox' ? _event.target.checked : _event.target.value;

    setValues({
      ..._formValues,
      [name]: newValue,
    });
  };

  const resetForm = () => {
    setValues(_initialValues);
  };

  return {
    _formValues,
    handleChange,
    resetForm,
  };
};

export default useFormInput;