import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Container, Card, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class UserHome extends React.Component {
  render() {
    const gridStyle = { paddingTop: '20px' };
    return (
        <Container fluid>
          <div className="landing-page-style">
            <Grid id='landing-page' style={gridStyle} textAlign='center' container>
              <Grid.Row>
                <Header as="h1" size="huge">Welcome to </Header>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Card fluid>
                    <Image src='images/calendar1.jpg' wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>Participate in or create study sessions</Card.Header>
                    </Card.Content>
                  </Card>
                  {/** <Icon name='calendar' size='massive' className="landing-icons"/> */}
                </Grid.Column>
                <Grid.Column>
                  <Card fluid>
                    <Image src='images/collab.jpg' wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>Collaborate with other students.</Card.Header>
                    </Card.Content>
                  </Card>
                  {/** <Icon name='comment alternate' size='massive' className="landing-icons"/> */}
                </Grid.Column>
                <Grid.Column>
                  <Card fluid>
                    <Image src='images/rewards.png' wrapped ui={false} />
                    <Card.Content>
                      <Card.Header>Earn rewards for being helpful to others</Card.Header>
                    </Card.Content>
                  </Card>
                  {/** <Icon name='users' size='massive' className="landing-icons"/> */}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Header as ="h3"><Link to="/signin">Login</Link> to see Current Study Sessions, Events, and other useful info!</Header>
              </Grid.Row>
            </Grid>
          </div>
        </Container>
    );
  }
}

export default UserHome;
