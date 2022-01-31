/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const funcs = {

  getProfile: () => fetch(`${process.env.REACT_APP_API_URL}/api/profile`)
    .then((response) => response.json()),

  insertProfile: (params) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/profile?name=${(params.first_name)}&lastName=${(params.last_name)}&country=${(params.country)}&city=${(params.city)}&email=${(params.email)}&phone=${(params.phone_number)}&smsNotif=${(params.sms_notif)}&emailNotif=${(params.email_notif)}&picture=azertyui&pictureName=azerty`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => response.json());
  },
};
export default funcs;
