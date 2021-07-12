import * as api from '../../api';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const USER_UPDATE_PROFILE_REQUEST = 'USER_UPDATE_PROFILE_REQUEST';
export const USER_UPDATE_PROFILE_SUCCESS = 'USER_UPDATE_PROFILE_SUCCESS';
export const USER_UPDATE_PROFILE_FAILURE = 'USER_UPDATE_PROFILE_FAILURE';
export const USER_UPDATE_PROFILE_RESET = 'USER_UPDATE_PROFILE_RESET';

export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';

export const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const userLoginSuccess = (user) => ({
  type: USER_LOGIN_SUCCESS,
  payload: user,
});

export const userLoginFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const userUpdateProfileReset = () => ({
  type: USER_UPDATE_PROFILE_RESET,
});

export function getUserInfo({ email, password }) {
  return async (dispatch) => {
    dispatch(userLoginRequest());

    try {
      const resp = await api.getUserInfo({ email, password });
      dispatch(userLoginSuccess(resp.data));
      localStorage.setItem('token', resp.data.token);
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.message : error.message;
      dispatch(userLoginFailure(message));
    }
  };
}

export function getUserById(id) {
  return async (dispatch) => {
    dispatch({ type: GET_USER_BY_ID_REQUEST });

    try {
      const resp = await api.getUserById(id);
      dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: resp.data });
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.message : error.message;
      dispatch({ type: GET_USER_BY_ID_FAILURE, payload: message });
    }
  };
}

export function userUpdateProfile(data, id) {
  return async (dispatch) => {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    try {
      await api.userUpdateProfile(data, id);
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: 1 });
      dispatch(getUserById(id));
    } catch (error) {
      const message = error.response && error.response.data ? error.response.data.message : error.message;
      dispatch({ type: USER_UPDATE_PROFILE_FAILURE, payload: message });
    }
  };
}
