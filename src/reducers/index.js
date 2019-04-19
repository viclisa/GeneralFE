import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import propertyReducer from './propertyReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  property: propertyReducer,
  image: imageReducer,
  profile: profileReducer,
  post: postReducer
});
