import React from 'react';
import { Loader, Table } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { UserInfo } from '../../api/userInfo/UserInfo';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  renderPage() {
    return (
        <Table.Column>
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
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe(UserInfo.userPublicationName);
  return {
    users: UserInfo.collection.findOne(),
    ready: subscription.ready(),
  };
})(UserProfile);
