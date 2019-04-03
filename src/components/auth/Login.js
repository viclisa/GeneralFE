import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import TextFieldGroup2 from '../common/TextFieldGroup2';

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
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
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

  render() {
    const { errors } = this.state;

    return (
      <div>
        <section className='header'>
          <svg
            class='shrine-logo'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            width='48px'
            height='48px'
            viewBox='0 0 24 24'
            enable-background='new 0 0 24 24'
            xmlSpace='preserve'
            fill='#000000'
            focusable='false'
          >
            <g>
              <g>
                <path
                  d='M17,2H7L2,6.62L12,22L22,6.62L17,2z M16.5,3.58l3.16,2.92H16.5V3.58z M7.59,3.5H15v3H4.34L7.59,3.5z
                  M11.25,18.1L7.94,13h3.31V18.1z M11.25,11.5H6.96L4.69,8h6.56V11.5z M16.5,12.32 M12.75,18.09V8h6.56L12.75,18.09z'
                />
              </g>
              <rect fill='none' width='24' height='24' />
            </g>
          </svg>
          <h1>SHRINE</h1>
        </section>
        <form action='home.html'>
          <div className='mdc-text-field username'>
            <input
              type='text'
              className='mdc-text-field__input'
              id='username-input'
              name='username'
              required
            />
            <label className='mdc-floating-label' for='username-input'>
              Username
            </label>
            <div className='mdc-line-ripple' />
          </div>
          <div className='mdc-text-field password'>
            <input
              type='password'
              className='mdc-text-field__input'
              id='password-input'
              name='password'
              required
              minlength='8'
            />
            <label className='mdc-floating-label' for='password-input'>
              Password
            </label>
            <div className='mdc-line-ripple' />
          </div>
          <div className='button-container'>
            <button type='button' className='mdc-button cancel'>
              <span className='mdc-button__label'>Cancel</span>
            </button>
            <button className='mdc-button mdc-button--raised next'>
              <span className='mdc-button__label'>Next</span>
            </button>
          </div>
        </form>

        <form onSubmit={this.onSubmit}>
          <TextFieldGroup2
            placeholder='Email Address'
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          <TextFieldGroup
            placeholder='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
          />
          <input type='submit' className='btn btn-info btn-block mt-4' />
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
