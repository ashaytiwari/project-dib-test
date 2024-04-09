import React from 'react';

function FormControl(props) {

  const { label, type, name, value, placeholder, onChange } = props;

  const inputControlAttributes = {
    className: 'form-control',
    type,
    name,
    placeholder,
    value: value,
    onChange(event) {
      const { name, value } = event.target;
      onChange(name, value);
    }
  };

  return (
    <div className="mb-4">
      <label>{label}</label>
      <input {...inputControlAttributes} />
    </div>
  );

}

export default FormControl;