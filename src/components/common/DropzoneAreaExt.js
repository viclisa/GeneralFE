import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { updateDropZoneImage } from '../../actions/imageFileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class DropzoneAreaExt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }
  handleChange(files) {
    const imageData = {
      files: files
    };
    // this.props.uploadImage(imageData, this.props.history);
    this.props.updateDropZoneImage(imageData);
  }
  render() {
    const { errors } = this.state;
    return <DropzoneArea onChange={this.handleChange.bind(this)} />;
  }
}
DropzoneAreaExt.propTypes = {
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { updateDropZoneImage }
)(DropzoneAreaExt);
