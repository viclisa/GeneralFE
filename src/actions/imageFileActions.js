import { UPLOAD_IMAGE, DELETE_IMAGE, UPLOADING_IMAGE } from './types';

export const uploadingImage = () => dispatch => {
  dispatch({
    type: UPLOADING_IMAGE
  });
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
          console.log(data);
          dispatch({
            type: UPLOAD_IMAGE,
            payload: data
          });
        } else if (err) {
          console.error(err);
        }
      }
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
