/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Formik, Form,
} from 'formik';
import * as Yup from 'yup';
import {
  Button, FormControlLabel, TextField, Checkbox, Grid, Alert,
} from '@mui/material';
import AvatarUpload from '../AvatarUpload';
import funcs from '../../ApiProfile';

// RegEX To control phone Number Format
const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  country: Yup.string()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().matches(phoneRegExp).required('Required'),
  smsNotif: Yup.boolean(),
  emailNotif: Yup.boolean(),
});

function Profile() {
  const [profileData, setProfileData] = useState({});
  const handleChangeInput = (e) => {
    const newData = { ...profileData };
    if (e.target.name === 'sms_notif' || e.target.name === 'email_notif') {
      if (e.target.name === 'sms_notif') {
        if (newData.sms_notif === 1) {
          newData.sms_notif = 0;
        } else {
          newData.sms_notif = 1;
        }
      }
      if (e.target.name === 'email_notif') {
        if (newData.email_notif === 1) {
          newData.email_notif = 0;
        } else {
          newData.email_notif = 1;
        }
      }
    } else {
      newData[e.target.name] = e.target.value;
    }
    setProfileData(newData);
  };
  useEffect(() => {
    funcs.getProfile().then((data) => {
      setProfileData(data);
    });
  }, []);
  return (
    <div className="profile">
      <Formik
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({
          errors, touched,
        }) => (
          <Form>
            {!errors ? <Alert severity="error">There is a problem !</Alert> : '' }
            <AvatarUpload />
            <Grid container rowSpacing={1} columnSpacing={{ sm: 4, md: 6 }}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="first_name"
                  label="Name"
                  variant="standard"
                  value={profileData.first_name}
                  onChange={(e) => handleChangeInput(e)}
                  error={touched.name && Boolean(errors.name)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="last_name"
                  label="LastName"
                  variant="standard"
                  value={profileData.last_name}
                  onChange={(e) => handleChangeInput(e)}
                  error={touched.lastName && Boolean(errors.lastName)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  id="country"
                  name="country"
                  label="Country"
                  variant="standard"
                  value={profileData.country}
                  onChange={(e) => handleChangeInput(e)}
                  error={touched.country && Boolean(errors.country)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  variant="standard"
                  value={profileData.city}
                  onChange={(e) => handleChangeInput(e)}
                  error={touched.city && Boolean(errors.city)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="standard"
                  value={profileData.email}
                  onChange={(e) => handleChangeInput(e)}
                  error={touched.email && Boolean(errors.email)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone_number"
                  label="Phone Number"
                  variant="standard"
                  value={profileData.phone_number}
                  onChange={(e) => handleChangeInput(e)}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={errors.phone ? 'Phone number is not valid (Ex : +33 0 00 00 00 00)' : 'Ex : +33 0 00 00 00 00'}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControlLabel control={<Checkbox name="email_notif" checked={!!(profileData.email_notif)} onChange={(e) => handleChangeInput(e)} />} label="Email Alerts" />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControlLabel control={<Checkbox name="sms_notif" checked={!!(profileData.sms_notif)} onChange={(e) => handleChangeInput(e)} />} label="SMS Alerts" />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ float: 'right' }}
              onClick={(event) => {
                event.preventDefault();
                funcs.insertProfile(profileData);
              }}
            >
              Save

            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Profile;
