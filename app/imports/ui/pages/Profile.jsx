import React from 'react';
import { Meteor } from 'meteor/meteor';
import {Header, Grid, Container, Loader, Table, Image} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';


/** Render a Not Found page if the user enters a URL that doesn't match any route. */
class Profile extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
  const firstName = user.profile.firstname;
  const lastName = user.profile.lastname;
  const points = user.profile.points;
  const major = user.profile.major;
  const grad_date = user.profile.grad_date;
  console.log(grad_date);

    return (

          <div className="profile-page-style">
            <Grid id='profile-page' textAlign='center' verticalAlign='middle' container columns={2}>
              <Grid.Row width={9}><Header as="h1"> User Profile </Header></Grid.Row>
              <Grid.Row>
                <Grid.Column width={4}><Image src='images/defaultuser.png' size='medium' /></Grid.Column>
                <Grid.Column width={4}>
                    <Table basic>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell className="profile-labels">Name:</Table.Cell>
                          <Table.Cell className="profile-values">{firstName} {lastName}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="profile-labels">Points: </Table.Cell>
                          <Table.Cell className="profile-values">{points}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="profile-labels">Major: </Table.Cell>
                          <Table.Cell className="profile-values">{major}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell className="profile-labels">Grad Date: </Table.Cell>
                          <Table.Cell className="profile-values">{grad_date}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profile.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('userData');
  return {
    ready: subscription.ready(),
  };
})(Profile);
