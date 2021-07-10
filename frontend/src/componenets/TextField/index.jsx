import React, { useState } from 'react';

import { ErrorMessage, useField } from 'formik';

const TextField = (props) => {
  const [field] = useField(props);
  const [focus, setFocus] = useState(false);
  return (
    <div className="form-control w-full">
      <input
        className={`w-full p-2 bg-transparent outline-none border-b-2 ${focus ? 'border-[#153376]' : 'border-[#1257ec]'}`}
        {...field}
        {...props}
        autoComplete="off"
        onBlur={() => {
          setFocus(false);
        }}
        onFocus={() => setFocus(true)}
      />
      <ErrorMessage name={field.name} />
    </div>
  );
};

export default TextField;
