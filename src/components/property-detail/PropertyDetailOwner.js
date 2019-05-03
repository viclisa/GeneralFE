import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProperty } from '../../actions/propertyActions';
import Spinner from '../common/Spinner';
import EditProperty from '../crud-property/EditProperty';

class PropertyDetailOwner extends Component {
  componentDidMount() {
    this.props.getCurrentProperty();
  }

  render() {
    const { user } = this.props.auth;
    const { property, loading } = this.props.property;

    let propertyDetailOwnerContent;

    if (property === null || loading) {
      propertyDetailOwnerContent = <Spinner />;
    } else {
      // Check if logged in user has property data
      if (Object.keys(property).length > 0) {
        propertyDetailOwnerContent = (
          <div>
            EYYY {property.reference}
            <EditProperty property={this.props.property} />
          </div>
        );
      } else {
        // User is logged in but has no property
        propertyDetailOwnerContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.name}</p>
            <p>You have not yet setup a property, please add some info</p>
            <Link to='/create-property' className='btn btn-lg btn-info'>
              Create Property
            </Link>
          </div>
        );
      }
    }

    return <div>{propertyDetailOwnerContent}</div>;
  }
}

PropertyDetailOwner.propTypes = {
  auth: PropTypes.object.isRequired,
  property: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  property: state.property,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProperty }
)(PropertyDetailOwner);
