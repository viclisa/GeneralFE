import {
  UPLOADING_IMAGE,
  UPLOAD_IMAGE,
  SAVE_IMAGE,
  IMAGE_LOADING,
  GET_IMAGES
} from '../actions/types';

const initialState = {
  uploading: false,
  loading: false,
  saving: false,
  image: {},
  images: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOADING_IMAGE:
      return {
        ...state,
        uploading: true,
        saving: false
      };
    case UPLOAD_IMAGE:
      return {
        ...state,
        uploading: false,
        saving: true,
        image: action.payload
      };
    case SAVE_IMAGE:
      return {
        ...state,
        uploading: false,
        saving: false
      };
    case IMAGE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_IMAGES:
      return {
        ...state,
        loading: false,
        images: action.payload
      };

    default:
      return state;
  }
}
