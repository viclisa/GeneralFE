import { GET_PROPERTY, PROPERTY_LOADING } from '../actions/types';

const initialState = {
  property: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROPERTY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROPERTY:
      return {
        ...state,
        property: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
