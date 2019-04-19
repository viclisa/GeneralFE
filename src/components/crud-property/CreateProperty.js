import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProperty } from '../../actions/propertyActions';
import { MDCTextField } from '@material/textfield';

class CreateProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: '',
      website: '',
      location: '',
      description: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const reference = new MDCTextField(document.querySelector('.reference'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.property) {
      this.setState({ property: nextProps.property });
    }
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { property } = this.state.props.property;
    return (
      <div className='create-property'>
        <h1 className='display-4 text-center'>Create Your Property</h1>
        <p className='lead text-center'>
          Let's get some information to make your profile stand out
        </p>
        {property.reference}
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
            info='A unique reference for your proproperty.'
          />
          <TextFieldGroup
            placeholder='Website'
            name='website'
            id='website-input'
            matClassName='website'
            value={this.state.website}
            onChange={this.onChange}
            error={errors.website}
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
            info='Tell us a little about the property'
          />

          <input
            type='submit'
            value='Submit'
            className='btn btn-info btn-block mt-4'
          />
        </form>
      </div>
    );
  }
}

CreateProperty.propTypes = {
  property: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  property: state.property,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProperty }
)(withRouter(CreateProperty));
