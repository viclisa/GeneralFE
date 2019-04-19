import { UPLOADING_IMAGE, UPLOAD_IMAGE } from '../actions/types';

const initialState = {
  uploading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOADING_IMAGE:
      return {
        ...state,
        uploading: true
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploading: false
      };
    default:
      return state;
  }
}
