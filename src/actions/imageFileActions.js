import axios from 'axios';
import {
  UPLOAD_IMAGE,
  DELETE_IMAGE,
  UPLOADING_IMAGE,
  SAVE_IMAGE
} from './types';
import uuidv1 from 'uuid/v1';

export const uploadingImage = () => dispatch => {
  dispatch({
    type: UPLOADING_IMAGE
  });
};

// Save Image reference on Mongo
export const saveImage = imageData => dispatch => {
  axios
    .post('/api/images', imageData)
    .then(res =>
      dispatch({
        type: SAVE_IMAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Upload image
export const uploadImage = imageData => dispatch => {
  // Inicializar el proveedor de credenciales de Amazon Cognito
  AWS.config.region = 'us-west-2'; // Región
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:f37c080c-1c12-46bc-bdd5-692fa14f7715'
  });
  const s3Client = new AWS.S3({
    params: {
      Bucket: 'inmobileimages'
    }
  });
  imageData.files.forEach(file => {
    s3Client.putObject(
      {
        Key: file.name,
        ContentType: file.type,
        Body: file
      },
      (err, data) => {
        if (data) {
          dispatch({
            type: UPLOAD_IMAGE,
            payload: data
          });
        } else if (err) {
          console.error(err);
        }
      }
    );
    const mongoImage = {
      propertyId: imageData.propertyId,
      name: file.name,
      url: ''
    };
    axios
      .post('/api/image', mongoImage)
      .then(res =>
        dispatch({
          type: SAVE_IMAGE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  });
};

// TODO PROBAR
// Delete image
export const deleteImage = imageData => dispatch => {
  // Inicializar el proveedor de credenciales de Amazon Cognito
  AWS.config.region = 'us-west-2'; // Región
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-west-2:f37c080c-1c12-46bc-bdd5-692fa14f7715'
  });
  const s3Client = new AWS.S3({
    params: {
      Bucket: 'inmobileimages'
    }
  });

  s3Client.deleteImage(
    {
      Key: imageData.file.name,
      ContentType: imageData.file.type
    },
    (err, data) => {
      if (data) {
        console.log(data);
        dispatch({
          type: DELETE_IMAGE,
          payload: data
        });
      } else if (err) {
        console.error(err);
      }
    }
  );
};
