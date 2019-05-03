import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImage, saveImage } from '../../actions/imageFileActions';

class DropzoneAreaExt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      image: {},
      property: {},
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.image) {
      this.setState({ image: nextProps.image });
      const imageData = {
        propertyId: this.props.property.id,
        files: this.state.files
      };
      if (nextProps.image.uploading) {
        this.props.uploadImage(imageData, this.props.history);
      } else if (nextProps.image.saving) {
        const mongoImage = {
          propertyId: nextProps.property.property._id,
          name: nextProps.image.image.key,
          url: nextProps.image.image.Location
        };
        this.props.saveImage(mongoImage, this.props.history);
      }
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleChange(files) {
    this.setState({
      files: files
    });
  }
  render() {
    const { errors } = this.state;
    return <DropzoneArea onChange={this.handleChange.bind(this)} />;
  }
}
DropzoneAreaExt.propTypes = {
  image: PropTypes.object.isRequired,
  property: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  property: state.property,
  image: state.image
});
export default connect(
  mapStateToProps,
  { uploadImage, saveImage }
)(DropzoneAreaExt);
