import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProperty } from '../../actions/propertyActions';
import { uploadingImage } from '../../actions/imageFileActions';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import isEmpty from '../../validation/is-empty';
import DropzoneAreaExt from '../common/DropzoneAreaExt';

class EditProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: '',
      website: '',
      location: '',
      description: '',
      property: {},
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const property = this.props.property.property;
    property.reference = !isEmpty(property.reference) ? property.reference : '';
    property.website = !isEmpty(property.website) ? property.website : '';
    property.location = !isEmpty(property.location) ? property.location : '';
    property.description = !isEmpty(property.description)
      ? property.description
      : '';
    // Set component fields state
    this.setState({
      reference: property.reference,
      website: property.website,
      location: property.location,
      description: property.description
    });
    const reference = new MDCTextField(document.querySelector('.reference'));
    const website = new MDCTextField(document.querySelector('.website'));
    const location = new MDCTextField(document.querySelector('.location'));
    // const fabRipple = new MDCRipple(document.querySelector('.mdc-fab'));
  }

  onSubmit(e) {
    e.preventDefault();

    const propertyData = {
      reference: this.state.reference,
      website: this.state.website,
      location: this.state.location,
      description: this.state.description
    };

    this.props.createProperty(propertyData, this.props.history);
  }

  onClick(e) {
    this.props.uploadingImage();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className='create-property'>
        <h1 className='display-4 text-center'>
          Edita tu propiedad. Tendrá mas valor
        </h1>
        <small className='d-block pb-3'>* = required fields</small>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder='Property reference'
            name='reference'
            id='reference-input'
            matClassName='reference'
            value={this.state.reference}
            onChange={this.onChange}
            error={errors.reference}
            edit='true'
            info='A unique reference for your property.'
          />
          <TextFieldGroup
            placeholder='Website'
            name='website'
            id='website-input'
            matClassName='website'
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
            edit='true'
            info='Could be your company website'
          />
          <TextFieldGroup
            placeholder='Location'
            name='location'
            id='location-input'
            matClassName='location'
            value={this.state.location}
            onChange={this.onChange}
            error={errors.location}
            edit='true'
            info='City or city & state suggested (eg. Boston, MA)'
          />
          <TextAreaFieldGroup
            placeholder='Short description'
            name='description'
            id='description-input'
            matClassName='description'
            value={this.state.description}
            onChange={this.onChange}
            error={errors.description}
            edit='true'
            info='Tell us a little about the property'
          />
          <DropzoneAreaExt />

          <div className='button-container'>
            <button
              type='button'
              className='mdc-button mdc-button--raised next'
              onClick={this.onClick}
            >
              <span className='mdc-button__label'>upload</span>
            </button>
          </div>
          <div className='button-container'>
            <button className='mdc-button mdc-button--raised next'>
              <span className='mdc-button__label'>save</span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

EditProperty.propTypes = {
  property: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  property: state.property,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProperty, uploadingImage }
)(EditProperty);
