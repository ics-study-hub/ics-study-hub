import React from 'react';
import { Button, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class LeaderboardAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.leaderboard.ranking}</Table.Cell>
          <Table.Cell><Image size='mini' floated='left' src={this.props.leaderboard.image}/>{this.props.leaderboard.name}</Table.Cell>
          <Table.Cell>{this.props.leaderboard.points}</Table.Cell>
          <Table.Cell><Button negative icon="trash alternate"/></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
LeaderboardAdmin.propTypes = {
  leaderboard: PropTypes.object.isRequired,
};

export default LeaderboardAdmin;
