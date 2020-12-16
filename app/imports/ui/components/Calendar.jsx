import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import swal from 'sweetalert';
import { createEventId } from '../../api/Event/event-utils';
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

export default class Calendar extends React.Component {
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
                select={this.handleDateSelect}
                eventContent={renderEventContent}
                eventClick={ e => this.handleEventClick(e, this.props.stuffs._id)}
                eventsSet={this.handleEvents}
                events={this.props.stuffs}
            />
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
    // eslint-disable-next-line no-undef,no-alert
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
    // eslint-disable-next-line no-undef,no-restricted-globals,no-alert
    swal({
      title: 'Do you want to delete study session?',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            clickInfo.event.remove(this.props.stuffs._id);
            Stuffs.collection.remove(this.props.stuffs._id);
            swal('Study session deleted');
          }
        });
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  }
}

Calendar.propTypes = {
  stuffs: PropTypes.array.isRequired,
};
