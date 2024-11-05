import { useState } from 'react';

const useFormInput = (_initialValues: { [key: string]: string | number | boolean; }) => {
  const [formValues, setValues] = useState(_initialValues);

  const handleChange = (_eventOrString: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string) => {
    if (typeof _eventOrString === 'string') {
      const [name, newValue] = _eventOrString.split(':');
      setValues({
        ...formValues,
        [name]: newValue,
      });
      return;
    }

    if (!_eventOrString || !_eventOrString.target) return;

    const { name, type } = _eventOrString.target;
    
    // Handle checkbox separately since its value is in `checked`
    let newValue: any;

    if (type === 'checkbox') {
      newValue = (_eventOrString.target as HTMLInputElement).checked;
    } else {
      newValue = _eventOrString.target.value;
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