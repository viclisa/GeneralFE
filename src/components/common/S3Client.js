import S3 from 'aws-s3';

class S3Client extends Component {
  constructor(props) {
    console.log('estory vivus');
    super(props);
    const config = {
      bucketName: 'inmobileimages',
      accessKeyId: 'AKIAI4RUZJ7CL7VCFZ4A',
      secretAccessKey: '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',
      s3Url: 'http://s3.amazonaws.com/inmobileimages' /* optional */
    };

    const S3Client = new S3(config);
    this.state = {
      client: S3Client,
      files: [],
      errors: {}
    };
  }

  /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

  /* This is optional */
  // const newFileName = 'my-awesome-file';
  uploadFile() {
    client
      .uploadFile(file, newFileName)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  /**
   * {
   *   Response: {
   *     bucket: "your-bucket-name",
   *     key: "photos/image.jpg",
   *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
   *   }
   * }
   */
}
export default S3Client;
