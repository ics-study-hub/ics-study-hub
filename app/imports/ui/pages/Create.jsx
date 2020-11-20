import React from 'react';
import { Grid, Segment, Header, LongText } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { GroupSession } from '../../api/session/GroupSession';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  reason: {
    type: String,
    allowedValues: ['Help', 'Finding a study session', 'Exam preparation'],
},
  description: String,
  findGroup: {
    type: String,
    allowedValues: ['yes', 'no'],
    defaultValue: 'yes',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Create extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, reason, description, findGroup } = data;
    const owner = Meteor.user().username;
    GroupSession.collection.insert({ name, reason, description, findGroup, owner },
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
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Create a Session</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <SelectField name='reason'/>
                <SelectField name='findGroup'/>
                <LongTextField name = 'description'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Create;
