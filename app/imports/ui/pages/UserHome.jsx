import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Card, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';

/** A simple static component to render some text for the landing page. */
class UserHome extends React.Component {
  render() {
    const gridStyle = { paddingTop: '20px' };
    const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
    if (isAdmin) {
      return (
          <Container fluid>
            <div className="landing-page-style">
              <Grid id='landing-page' style={gridStyle} textAlign='center' container>
                <Grid.Row>
                  <Header as="h1" size="huge">Welcome Admin</Header>
                </Grid.Row>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <Link to="/usercalendar">
                      <Card fluid>
                        <Image src='images/calendar1.jpg' wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>View current sessions</Card.Header>
                        </Card.Content>
                      </Card>
                    </Link>
                    {/** <Icon name='calendar' size='massive' className="landing-icons"/> */}
                  </Grid.Column>
                  <Grid.Column>
                    <Link to="/admin">
                      <Card fluid>
                        <Image src='images/collab.jpg' wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>Sessions Admin</Card.Header>
                        </Card.Content>
                      </Card>
                    </Link>
                    {/** <Icon name='comment alternate' size='massive' className="landing-icons"/> */}
                  </Grid.Column>
                  <Grid.Column>
                    <Link to="/leaderboardadmin">
                      <Card fluid>
                        <Image src='images/rewards.png' wrapped ui={false} />
                        <Card.Content>
                          <Card.Header>Leaderboard Admin</Card.Header>
                        </Card.Content>
                      </Card>
                    </Link>
                    {/** <Icon name='users' size='massive' className="landing-icons"/> */}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Container>
      );
    }
    return (
        <Container fluid>
          <div className="landing-page-style">
            <Grid id='landing-page' style={gridStyle} textAlign='center' container>
              <Grid.Row>
                <Header as="h1" size="huge">Welcome!!!</Header>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Link to="/usercalendar">
                    <Card fluid>
                      <Image src='images/calendar1.jpg' wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>View current sessions</Card.Header>
                      </Card.Content>
                    </Card>
                  </Link>
                  {/** <Icon name='calendar' size='massive' className="landing-icons"/> */}
                </Grid.Column>
                <Grid.Column>
                  <Link to="/create">
                    <Card fluid>
                      <Image src='images/collab.jpg' wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>Create a session</Card.Header>
                      </Card.Content>
                    </Card>
                  </Link>
                  {/** <Icon name='comment alternate' size='massive' className="landing-icons"/> */}
                </Grid.Column>
                <Grid.Column>
                  <Link to="/listleaderboard">
                    <Card fluid>
                      <Image src='images/rewards.png' wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>Leaderboard</Card.Header>
                      </Card.Content>
                    </Card>
                  </Link>
                  {/** <Icon name='users' size='massive' className="landing-icons"/> */}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Container>
    );
  }
}

export default UserHome;
