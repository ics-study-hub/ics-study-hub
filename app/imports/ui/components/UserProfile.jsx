import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (
        <Table.Column>
          <Table.Cell>{this.props.profile.picture}</Table.Cell>
          <Table.Cell>{this.props.profile.firstName}</Table.Cell>
          <Table.Cell>{this.props.profile.lastName}</Table.Cell>
          <Table.Cell>{this.props.profile.email}</Table.Cell>
          <Table.Cell>{this.props.profile.description}</Table.Cell>
        </Table.Column>
    );
  }
}

UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default UserProfile;
