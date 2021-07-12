import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import {
  Formik, Form, FastField,
} from 'formik';
import TextField from '../TextField';
import FileField from '../FileField';
import CheckBoxField from '../CheckBoxField';

import { userUpdateProfile, userUpdateProfileReset } from '../../stores/user/userAction';

function Profile({ user }) {
  const dispatch = useDispatch();

  const { loading, updated, error } = useSelector((state) => state.userUpdateReducer);
  const { userInfo } = useSelector((state) => state.userByIdReducer);

  const getUserValue = (values) => ({
    firstname: values.firstname ? values.firstname : '',
    lastname: values.lastname ? values.lastname : '',
    email: values.email ? values.email : '',
    country: values.country ? values.country : '',
    city: values.city ? values.city : '',
    phonenumber: values.phonenumber ? values.phonenumber : '',
    emailalert: values.emailalert,
    smsalert: values.smsalert,
    profile: '',
  });

  const [initialValues, setInitialValues] = useState({ ...getUserValue({}), profile: '' });

  const handleUpdateUser = (values) => {
    const formData = new FormData();
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('email', values.email);
    formData.append('country', values.country);
    formData.append('city', values.city);
    formData.append('phonenumber', values.phonenumber);
    formData.append('emailalert', values.emailalert);
    formData.append('smsalert', values.smsalert);
    formData.append('profile', values.profile);

    dispatch(userUpdateProfile(formData, user.id));
  };
  useEffect(() => {
    if (user.id) {
      const userValue = getUserValue(user);
      setInitialValues({ ...userValue, profile: '' });
    }
  }, [user]);

  useEffect(() => {
    if (userInfo.id) {
      const userUpdate = getUserValue(userInfo);
      setInitialValues((prev) => ({ ...prev, ...userUpdate }));
    }
  }, [userInfo]);

  useEffect(() => {
    if (updated || error) setTimeout(() => { dispatch(userUpdateProfileReset()); }, 3000);
  }, [updated, error]);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => handleUpdateUser(values)}
    >
      <div className="user-profile w-[60%] max-w-[800px] mx-auto rounded-sm shadow bg-gray-100 p-8">
        {loading ? <h2>Processing...</h2> : ''}
        {updated ? <h2 className="text-green-600">Update Profile Success</h2> : ''}
        {error ? <h2 className="text-red-600">{error}</h2> : '' }
        <Form>
          <FastField name="profile" component={FileField} />
          <div className="grid grid-cols-2 gap-8 mb-8">
            <TextField type="text" name="firstname" placeholder="First Name" />
            <TextField type="text" name="lastname" placeholder="Last Name" />
            <TextField type="text" name="country" placeholder="Country" />
            <TextField type="text" name="city" placeholder="City" />
            <TextField type="text" name="email" placeholder="Email" />
            <TextField type="text" name="phonenumber" placeholder="Phone Number" />
            <FastField name="emailalert" label="Email Alert" component={CheckBoxField} />
            <FastField name="smsalert" label="Sms Alert" component={CheckBoxField} />
          </div>
          <button type="submit" className="w-full p-2 text-center bg-[#153376] text-white shadow rounded">Save</button>
        </Form>
      </div>
    </Formik>
  );
}

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.any),
};
Profile.defaultProps = {
  user: { email: 'undefined@' },
};

export default Profile;
