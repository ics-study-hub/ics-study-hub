import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Header, Grid, Container, Loader} from 'semantic-ui-react';
import PropTypes from "prop-types";
import { withTracker } from 'meteor/react-meteor-data';
import {Leaderboards} from "../../api/leaderboard/Leaderboard";
import {Stuffs} from "../../api/stuff/Stuff";

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Profile extends React.Component {

  render() {
    const subscription = Meteor.subscribe('userData');
    return (subscription) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
  console.log(Meteor.user());
  const user = Meteor.user();
  const firstName = user.profile.firstname;
  const lastName = user.profile.lastname;
  const points = user.profile.points;

    return (
        <Container fluid>
          <div className="landing-page-style">
            <Grid id='profile-page' textAlign='center' container>
              <Grid.Row> <Header as="h1">Hello {firstName} {lastName}</Header> </Grid.Row>
              <Grid.Row> <Header as="h1">Rating: {points}</Header> </Grid.Row>
            </Grid>
          </div>
        </Container>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('userData');
  return {
    user: Meteor.user(),
    ready: subscription.ready(),
  };
})(Profile);
