import React from 'react';
import { Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.ranking}</Table.Cell>
          <Table.Cell><Image size='mini' floated='left' src={this.props.stuff.image}/>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.points}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
