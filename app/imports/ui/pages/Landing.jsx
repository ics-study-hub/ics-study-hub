import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { marginTop: '10px' };
    return (
        <Grid id='landing-page' style={gridStyle} verticalAlign='middle' textAlign='center' container>

          <Header as="h1" >Welcome to the ICS Study Hub!</Header>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Icon name='calendar' size='massive' />
            </Grid.Column>
            <Grid.Column>
              <Icon name='comment alternate' size='massive' />
            </Grid.Column>
            <Grid.Column>
              <Icon name='users' size='massive' />
            </Grid.Column>
          </Grid.Row>
          <h3>Here, you can give or receive help, work with others, and view questions or topics posted by other students!</h3>
          <p><Link to="/signin">Login</Link> to see Current Study Sessions, Events, and other useful info!</p>

        </Grid>
    );
  }
}

export default Landing;
