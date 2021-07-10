import * as userAction from './userAction';

export const userLoginReducer = (state = { user: {}, token: localStorage.getItem('token') ? localStorage.getItem('token') : '' }, action) => {
  switch (action.type) {
    case userAction.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userAction.USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case userAction.USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { updated: false }, action) => {
  switch (action.type) {
    case userAction.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userAction.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updated: action.payload,
        loading: false,
      };
    case userAction.USER_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case userAction.USER_UPDATE_PROFILE_RESET:
      return {
        ...state,
        loading: false,
        updated: false,
        error: null,
      };
    default:
      return state;
  }
};

export const userByIdReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case userAction.GET_USER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userAction.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
      };
    case userAction.GET_USER_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
