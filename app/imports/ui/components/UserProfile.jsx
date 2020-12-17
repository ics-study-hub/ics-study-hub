import React from 'react';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting Data</Loader>;
  }

  renderPage() {
    const currentUser = Meteor.user();
    return (
        <Container fluid>
          <div className="landing-page-style">
            <Grid id='profile-page' textAlign='center' container>
              <Grid.Row> <Header as="h1">Hello {currentUser.username}</Header> </Grid.Row>
            </Grid>
          </div>
        </Container>
    );
  }
}

UserProfile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('userData');
  return {
    ready: subscription.ready(),
  };
})(UserProfile);
