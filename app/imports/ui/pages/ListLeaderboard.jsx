import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';
import { Leaderboards } from '../../api/leaderboard/Leaderboard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListLeaderboard extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active inverted>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const headerStyle = { color: 'white' };
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Leaderboard</Header>
          <Table basic='very' inverted className="ui table">
            <Table.Header inverted>
              <Table.Row>
                <Table.HeaderCell>Ranking</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.leaderboards.map((leaderboard) => <Leaderboard key={leaderboard._id} leaderboard={leaderboard} />)}
            </Table.Body>
          </Table>
          <Header as ="h3" style={headerStyle} textAlign="center" inverted>Earn more points by joining a <Link to="/calendar">Study Session!</Link></Header>
        </Container>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListLeaderboard.propTypes = {
  leaderboards: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Leaderboards.userPublicationName);
  return {
    leaderboards: Leaderboards.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListLeaderboard);
