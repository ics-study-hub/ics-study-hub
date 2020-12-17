import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component {
  handleClick(e, documentId) {
    e.preventDefault();
    swal({
      title: 'Do you want to delete study session?',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Stuffs.collection.remove(documentId);
            swal('Study session deleted');
          }
        });
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.className}</Table.Cell>
          <Table.Cell>{this.props.stuff.reason}</Table.Cell>
          <Table.Cell>{this.props.stuff.time}</Table.Cell>
          <Table.Cell>{this.props.stuff.month} {this.props.stuff.day}</Table.Cell>
          <Table.Cell>{this.props.stuff.description}</Table.Cell>
          <Table.Cell>{this.props.stuff.findGroup}</Table.Cell>
          <Table.Cell><Button negative onClick={ e => this.handleClick(e, this.props.stuff._id)}>&times;</Button></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default withRouter(StuffItemAdmin);
