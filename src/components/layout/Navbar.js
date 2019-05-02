import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import TopAppBar from '../common/TopAppBar';

class Navbar extends Component {
  state = {
    isFixed: false,
    isShort: false,
    isRtl: false,
    isProminent: false,
    isAlwaysCollapsed: false,
    noActionItems: false,
    shouldReinit: false
  };

  componentDidUpdate(prevProps, prevState) {
    const shouldReinit =
      prevState.isShort !== this.state.isShort ||
      prevState.isFixed !== this.state.isFixed ||
      prevState.noActionItems !== this.state.noActionItems;

    // This is a hack: this to teardown and remount the top app bar to
    // show the different variants. No one should need to do this except
    // in a demo page.
    if (shouldReinit) {
      this.setState({ shouldReinit: true });
      setTimeout(() => {
        this.setState({ shouldReinit: false });
      });
    }
  }

  get actionItems() {
    const { isShort, noActionItems } = this.state;
    if (noActionItems) {
      return null;
    }

    const actionItems = [
      <a
        href='#'
        className='material-icons mdc-top-app-bar__action-item'
        aria-label='Bookmark this page'
        alt='Bookmark this page'
      >
        bookmark
      </a>
    ];

    // Top App Bar Spec allows for only 1 action item with the short variant
    if (!isShort) {
      [].push.apply(actionItems, [
        <a
          href='#'
          className='material-icons mdc-top-app-bar__action-item'
          aria-label='Download'
          alt='Download'
        >
          file_download
        </a>,
        <a
          href='#'
          className='material-icons mdc-top-app-bar__action-item'
          aria-label='Print this page'
          alt='Print this page'
        >
          print
        </a>
      ]);
    }
    return actionItems;
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/feed'>
            Post Feed
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <a
            href=''
            onClick={this.onLogoutClick.bind(this)}
            className='nav-link'
          >
            <img
              className='rounded-circle'
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title='You must have a Gravatar connected to your email to display an image'
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <TopAppBar
        navIcon={this.renderNavIcon()}
        short={false}
        prominent={false}
        fixed={false}
        alwaysCollapsed={false}
        title='Mountain View, CA'
        actionItems={this.actionItems}
      />
    );
  }
  renderNavIcon() {
    return (
      <a
        className='material-icons mdc-top-app-bar__navigation-icon'
        href='#'
        onClick={() => {
          console.log('nav icon clicked');
        }}
      >
        menu
      </a>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
