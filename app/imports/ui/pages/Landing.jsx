import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Icon, Header, Container } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { paddingTop: '20px', height: '75vh' };
    const headerStyle = { color: 'white' };
    return (
        <Container fluid>
        <div className="landing-page-style">
            <Grid id='landing-page' style={gridStyle} verticalAlign='top' textAlign='center' container>
             <Grid.Row>
               <Header as="h1" style={headerStyle}>Welcome to the ICS Study Hub!</Header>
             </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <Icon name='calendar' size='massive' className="landing-icons"/>
                </Grid.Column>
                <Grid.Column>
                  <Icon name='comment alternate' size='massive' className="landing-icons"/>
                </Grid.Column>
                <Grid.Column>
                  <Icon name='users' size='massive' className="landing-icons"/>
                </Grid.Column>
              </Grid.Row>
            <Grid.Row>
                <Header as ="h2" style={headerStyle}>Here, you can give or receive help, work with others, and view questions or topics posted by other students!</Header>
                <Header as ="h3" style={headerStyle}><Link to="/signin">Login</Link> to see Current Study Sessions, Events, and other useful info!</Header>
            </Grid.Row>
            </Grid>
        </div>
      </Container>
    );
  }
}

export default Landing;
