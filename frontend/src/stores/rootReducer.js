import { combineReducers } from 'redux';

import { userLoginReducer, userUpdateReducer, userByIdReducer } from './user/userReducer';

export default combineReducers({
  userLoginReducer,
  userUpdateReducer,
  userByIdReducer,
});
