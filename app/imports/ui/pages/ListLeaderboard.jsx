import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Leaderboard from '../components/Leaderboard';
import { Leaderboards } from '../../api/leaderboard/Leaderboards';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListLeaderboard extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        /** <Container>
          <Header as="h2" textAlign="center" inverted>List Contacts</Header>
          <Card.Group>
            {this.props.contacts.map((contact, index) => <Contact
                key={index}
                contact={contact}
                notes={this.props.notes.filter(note => (note.contactId === contact._id))}/>)}
          </Card.Group>
        </Container> */
        <Header as="h1" textAlign="center" inverted>Leaderboard</Header>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListLeaderboard.propTypes = {
  leaderboards: PropTypes.array.isRequired,
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  return {
    stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListLeaderboard);
