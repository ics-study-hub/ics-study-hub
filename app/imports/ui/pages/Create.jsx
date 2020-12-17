import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import {
  AutoForm,
  ErrorsField,
  SelectField,
  SubmitField,
  TextField,
  DateField,
  LongTextField,
} from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  className: {
    label: 'Class',
    type: String,
    allowedValues: ['ICS 101', 'ICS 102', 'ICS 103', 'ICS 110', 'ICS 111', 'ICS 141', 'ICS 210',
      // eslint-disable-next-line max-len
      'ICS 211', 'ICS 212', 'ICS 215', 'ICS 222', 'ICS 235', 'ICS 241', 'ICS 290', 'ICS 311', 'ICS 312', 'ICS 313', 'ICS 314', 'ICS 321', 'ICS 331', 'ICS 332', 'ICS 351', 'ICS 355', 'ICS 361', 'ICS 390', 'ICS 414', 'ICS 415', 'ICS 419', 'ICS 421', 'ICS 422', 'ICS 423', 'ICS 424', 'ICS 425', 'ICS 426', 'ICS 427', 'ICS 428', 'ICS 431', 'ICS 432', 'ICS 434', 'ICS 435', 'ICS 438', 'ICS 441', 'ICS 442', 'ICS 443', 'ICS 451', 'ICS 452', 'ICS 455', 'ICS 461', 'ICS 462', 'ICS 464', 'ICS 465', 'ICS 466', 'ICS 469', 'ICS 471', 'ICS 475', 'ICS 476', 'ICS 481', 'ICS 483', 'ICS 484', 'ICS 485', 'ICS 485', 'ICS 491', 'ICS 495', 'ICS 496', 'ICS 499'],
    defaultValue: 'ICS 111',
  },
  reason: {
    type: String,
    allowedValues: ['Homework Help', 'Finding a Study Session', 'Exam Preparation', 'Questions'],
  },
  description: String,
  date: {
    label: 'Date & Time',
    type: String,
  },
  findGroup: {
    label: 'Find Group?',
    type: String,
    allowedValues: ['Yes', 'No'],
    defaultValue: 'Yes',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Create extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, className, reason, date, description, findGroup } = data;
    const owner = Meteor.user().username;
    const time = date.getTime();
    const offset = date.getTimezoneOffset() * 60 * 1000;
    const newTime = time + offset;
    const newDate = new Date(newTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const timeStr = `${hours}:${minutes} ${ampm}`;

    // eslint-disable-next-line no-console
    console.log(timeStr);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    Stuffs.collection.insert({
          name,
          className,
          reason,
          time: timeStr,
          month: monthNames[newDate.getMonth()],
          day: newDate.getDate().toString(),
          year: newDate.getFullYear().toString(),
          description,
          findGroup,
          owner,
        },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Session added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered id="create-session">
          <Grid.Column>
            <Header as="h2" textAlign="center">Create a Session</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField id='create-name' name='name' showInlineError={true} placeholder={'Your name'}/>
                <SelectField id='create-class' name='className' showInlineError={true}/>
                <SelectField id='create-reason' name='reason' showInlineError={true}/>
                <DateField id='create-date' name='date' showInlineError={true}/>
                <SelectField id='create-findgroup' name='findGroup' showInlineError={true}/>
                <LongTextField id='create-description' name='description' showInlineError={true}
                               placeholder={'Description of your study session'}/>
                <SubmitField id="create-session-submit" value='Submit' showInlineError={true}/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Create;
