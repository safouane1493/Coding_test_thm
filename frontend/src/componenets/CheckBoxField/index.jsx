import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './CheckBoxField.css';

const CheckBoxField = (props) => {
  const { field, form, label } = props;
  const { name, value } = field;
  const [checked, setChecked] = useState();

  const handleCheckBoxChange = () => {
    const checkVal = checked === 1 ? 0 : 1;
    form.setFieldValue(name, checkVal);
    setChecked(checkVal);
  };

  useEffect(() => {
    setChecked(value);
  }, [value]);

  return (
    <div className="flex items-center space-x-4">
      <button className={`check-box ${checked ? 'active' : ''}`} onClick={handleCheckBoxChange} type="button" aria-label="Checkbox" />
      <div>{label}</div>
    </div>
  );
};

CheckBoxField.propTypes = {
  field: PropTypes.objectOf(PropTypes.any).isRequired,
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  label: PropTypes.string,
};

CheckBoxField.defaultProps = {
  label: '',
};

export default CheckBoxField;
