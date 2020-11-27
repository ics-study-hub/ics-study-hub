import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class StuffItemAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.reason}</Table.Cell>
          <Table.Cell>{this.props.stuff.time}</Table.Cell>
          <Table.Cell>{this.props.stuff.date}</Table.Cell>
          <Table.Cell>{this.props.stuff.description}</Table.Cell>
          <Table.Cell>{this.props.stuff.findGroup}</Table.Cell>
          <Table.Cell><Button negative icon="trash alternate"/></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItemAdmin.propTypes = {
  stuff: PropTypes.object.isRequired,
};

export default StuffItemAdmin;
