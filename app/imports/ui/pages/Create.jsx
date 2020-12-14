import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, DateField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Stuffs } from '../../api/stuff/Stuff';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  reason: {
    type: String,
    allowedValues: ['Homework Help', 'Finding a Study Session', 'Exam Preparation', 'Questions'],
},
  description: String,
  date: {
    label: 'Date & Time',
    type:Date,
    defaultValue: new Date(),
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
    const { name, reason, date, description, findGroup } = data;
    const owner = Meteor.user().username;
    Stuffs.collection.insert({ name, reason, date, description, findGroup, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
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
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField id='create-name' name='name' showInlineError={true} placeholder={'Your name'}/>
                <SelectField id='create-reason' name='reason' showInlineError={true}/>
                <DateField id='create-date' name='date' showInlineError={true}/>
                <SelectField id='create-findgroup' name='findGroup' showInlineError={true}/>
                <LongTextField id='create-description' name = 'description' showInlineError={true} placeholder={'Description of your study session'}/>
                <SubmitField id="create-session-submit" value='Submit' showInlineError={true} />
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Create;
