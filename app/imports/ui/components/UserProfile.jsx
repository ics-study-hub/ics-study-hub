import React from 'react';
import { Loader, Grid } from 'semantic-ui-react';
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
        <Grid verticalAlign='middle' container>
          <Grid.Row>
            <Grid.Column>
              <h2>{this.props.profile.username}</h2>
              <h2>{this.props.profile.firstName}</h2>
              <h2>{this.props.profile.lastName}</h2>
              <h2>{this.props.profile.description}</h2>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
