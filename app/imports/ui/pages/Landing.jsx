import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

            <h1>Welcome to the ICS Study Hub</h1>
            <h3>Here, you can give or receive help, work with others, and view questions or topics posted by other students!</h3>
            <p><Link to="/signin">Login</Link> to see Current Study Sessions, Events, and other useful info!</p>

        </Grid>
    );
  }
}

export default Landing;
