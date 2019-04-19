import axios from 'axios';

import { GET_PROPERTY, GET_ERRORS, PROPERTY_LOADING } from './types';

// Get current property
export const getCurrentProperty = () => dispatch => {
  dispatch(setPropertyLoading());
  axios
    .get('/api/property')
    .then(res =>
      dispatch({
        type: GET_PROPERTY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROPERTY,
        payload: {}
      })
    );
};

// Create Property
export const createProperty = (propertyData, history) => dispatch => {
  axios
    .post('/api/property', propertyData)
    .then(res => history.push('/property'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Property loading
export const setPropertyLoading = () => {
  return {
    type: PROPERTY_LOADING
  };
};
