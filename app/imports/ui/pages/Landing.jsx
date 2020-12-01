import React from 'react';
import { Grid, Header, Container, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withRouter, Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { paddingTop: '20px' };
    return (
        <Container fluid>
          <div className="landing-page-style">
            <Grid id='landing-page' style={gridStyle} textAlign='center' container>
              <Grid.Row>
                <Header as="h1" size="huge">Welcome to the ICS Study Hub!</Header>
              </Grid.Row>
              <Grid.Row columns={3}>
                {this.props.currentUser === '' ? (
                    [<Grid.Column key='create'>
                      <Card fluid>
                        <Image src='images/calendar1.jpg' wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>Participate in or create study sessions</Card.Header>
                        </Card.Content>
                      </Card>
                      {/** <Icon name='calendar' size='massive' className="landing-icons"/> */}
                    </Grid.Column>,
                      <Grid.Column key='create'>
                        <Card fluid>
                          <Image src='images/collab.jpg' wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>Collaborate with other students.</Card.Header>
                          </Card.Content>
                        </Card>
                        {/** <Icon name='comment alternate' size='massive' className="landing-icons"/> */}
                      </Grid.Column>,
                      <Grid.Column key='leaderboard'>
                        <Card fluid>
                          <Image src='images/rewards.png' wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>Earn rewards for being helpful to others</Card.Header>
                          </Card.Content>
                        </Card>
                        {/** <Icon name='users' size='massive' className="landing-icons"/> */}
                      </Grid.Column>]
                ) : ''}
                {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') === false ? (
               [<Grid.Column key='usercalendar'>
                 <Link to="/usercalendar">
                  <Card fluid>
                    <Image src='images/calendar1.jpg' wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>View current sessions</Card.Header>
                    </Card.Content>
                  </Card>
                   {/** <Icon name='calendar' size='massive' className="landing-icons"/> */}</Link>
                </Grid.Column>,
                <Grid.Column key='create'>
                  <Link to="/create">
                  <Card fluid>
                    <Image src='images/collab.jpg' wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>Create a session</Card.Header>
                    </Card.Content>
                  </Card>
                  {/** <Icon name='comment alternate' size='massive' className="landing-icons"/> */}
                  </Link>
                </Grid.Column>,
                <Grid.Column key='listleaderboard'>
                  <Link to="/listleaderboard">
                  <Card fluid>
                    <Image src='images/rewards.png' wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>Leaderboard</Card.Header>
                    </Card.Content>
                  </Card>
                  {/** <Icon name='users' size='massive' className="landing-icons"/> */}
                  </Link>
                </Grid.Column>]
                  ) : ''}
                {this.props.currentUser && Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                    [<Grid.Column key='usercalendar'>
                      <Link to="/usercalendar">
                      <Card fluid>
                        <Image src='images/calendar1.jpg' wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>View current sessions</Card.Header>
                        </Card.Content>
                      </Card>
                      {/** <Icon name='calendar' size='massive' className="landing-icons"/> */}
                      </Link>
                    </Grid.Column>,
                      <Grid.Column key='admin'>
                        <Link to="/admin">
                        <Card fluid>
                          <Image src='images/collab.jpg' wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>Sessions Admin</Card.Header>
                          </Card.Content>
                        </Card>
                        {/** <Icon name='comment alternate' size='massive' className="landing-icons"/> */}
                        </Link>
                      </Grid.Column>,
                      <Grid.Column key='leaderboardadmin'>
                        <Link to="/leaderboardadmin">
                        <Card fluid>
                          <Image src='images/rewards.png' wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>Leaderboard Admin</Card.Header>
                          </Card.Content>
                        </Card>
                        {/** <Icon name='users' size='massive' className="landing-icons"/> */}
                        </Link>
                      </Grid.Column>]
                ) : ''}
              </Grid.Row>
              {this.props.currentUser === '' ? (
                  [<Grid.Row key='signin'>
                    <Header as="h3"><Link to="/signin">Login</Link> to create a session, view sessions, or view the leaderboard.</Header>
                  </Grid.Row>]
              ) : ''}
            </Grid>
          </div>
        </Container>
    );
  }
}

/** Declare the types of all properties. */
Landing.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const LandingContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Landing);

export default withRouter(LandingContainer);
