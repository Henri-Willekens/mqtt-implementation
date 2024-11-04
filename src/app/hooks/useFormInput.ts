import { useState } from 'react';

const useFormInput = (_initialValues: { [key: string]: string | number | boolean; }) => {
  const [formValues, setValues] = useState(_initialValues);

  const handleChange = (_event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = _event.target;
    
    // Handle checkbox separately since its value is in `checked`
    let newValue: any;

    if (type === 'checkbox') {
      newValue = (_event.target as HTMLInputElement).checked;
    } else {
      newValue = _event.target.value;
    }

    setValues({
      ...formValues,
      [name]: newValue,
    });
  };

  const resetForm = () => {
    setValues(_initialValues);
  };

  return {
    formValues,
    handleChange,
    resetForm,
  };
};

export default useFormInput;