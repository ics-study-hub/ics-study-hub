import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import Calendar from '../components/Calendar';

class UserCalendar extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id='calendar-page'>
          <Container style={{ marginBottom: '1vh', backgroundColor: 'white' }}>
            <Calendar style={{ backgroundColor: 'white', height: '50vh' }} stuffs={this.props.stuffs}/>
          </Container>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserCalendar.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  return {
    stuffs: Stuffs.collection.find({}).fetch().map(
        (value, index) => {
          const months = {
            January: '01',
            February: '02',
            March: '03',
            April: '04',
            May: '05',
            June: '06',
            July: '07',
            August: '08',
            September: '09',
            October: '10',
            November: '11',
            December: '12',
          };
          const day = (`0${value.day}`).slice(-2);
          return { id: index, title: value.name, date: `${value.year}-${months[value.month]}-${day}` };
        },
    ),
    ready: subscription.ready(),
  };
})(UserCalendar);
