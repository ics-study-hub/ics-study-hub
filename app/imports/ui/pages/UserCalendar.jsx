import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../../api/Event/event-utils';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
function renderEventContent(eventInfo) {
  return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
  );
}

function renderSidebarEvent(event) {
  return (
      <li key={event.id}>
        <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        <i>{event.title}</i>
      </li>
  );
}

class UserCalendar extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  state = {
    weekendsVisible: true,
    currentEvents: [],
  }

  render() {
    return (
        <div className='demo-app'>
          {this.renderSidebar()}
          <div className='demo-app-main'>
            <Container>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={this.state.weekendsVisible}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                select={this.handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={this.handleEventClick}
                eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                /* you can update a remote database when these fire:
                eventAdd={function(){}}
                eventChange={function(){}}
                eventRemove={function(){}}
                */
            />
            </Container>
          </div>
        </div>
    );
  }

  renderSidebar() {
    return (
        <Container>
        <div className='demo-app-sidebar'>
          <div className='demo-app-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>Select dates and you will be prompted to create a new study session</li>
              <li>Drag, drop, and resize sessions</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
          <div className='demo-app-sidebar-section'>
            <label>
              <input
                  type='checkbox'
                  checked={this.state.weekendsVisible}
                  onChange={this.handleWeekendsToggle}
              />
              toggle weekends
            </label>
          </div>
          <div className='demo-app-sidebar-section'>
            <h2>All Events ({this.state.currentEvents.length})</h2>
            <ul>
              {this.state.currentEvents.map(renderSidebarEvent)}
            </ul>
          </div>
        </div>
        </Container>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  }

  handleDateSelect = (selectInfo) => {
    // eslint-disable-next-line no-undef
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();// clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-undef,no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
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
    stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserCalendar);
