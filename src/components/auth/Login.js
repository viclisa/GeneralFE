import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import { MDCRipple } from '@material/ripple';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import Logo from '../common/Logo';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/property');
    }
    const email = new MDCTextField(document.querySelector('.email'));
    const password = new MDCTextField(document.querySelector('.password'));
    const helperText = new MDCTextFieldHelperText(
      document.querySelector('.mdc-text-field-helper-text')
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/property');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFocus = e => {};

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Logo x='0' y='0' width='48px' height='48px' viewBox='24' />
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder='Email Address'
            name='email'
            type='email'
            id='email-input'
            matClassName='email'
            value={this.state.email}
            onChange={this.onChange}
            onFocus={this.onFocus}
            error={errors.email}
          />

          <TextFieldGroup
            placeholder='Password'
            name='password'
            type='password'
            id='password-input'
            matClassName='password'
            value={this.state.password}
            onChange={this.onChange}
            onFocus={this.onFocus}
            error={errors.password}
          />

          <div className='button-container'>
            <button className='mdc-button mdc-button--raised next'>
              <span className='mdc-button__label'>Next</span>
            </button>
          </div>

          {/* <input type='submit' className='btn btn-info btn-block mt-4' /> */}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
