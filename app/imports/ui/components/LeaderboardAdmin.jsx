import React from 'react';
import { Button, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Leaderboards } from '../../api/leaderboard/Leaderboard';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class LeaderboardAdmin extends React.Component {
  handleClick(e, documentId) {
    e.preventDefault();
    swal({
      title: 'Do you want to delete this person?',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            Leaderboards.collection.remove(documentId);
            swal('Ranking deleted');
          }
        });
  }

  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.leaderboard.ranking}</Table.Cell>
          <Table.Cell><Image size='mini' floated='left' src={this.props.leaderboard.image}/>{this.props.leaderboard.name}</Table.Cell>
          <Table.Cell>{this.props.leaderboard.points}</Table.Cell>
          <Table.Cell><Button negative onClick={ e => this.handleClick(e, this.props.leaderboard._id)}>&times;</Button></Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
LeaderboardAdmin.propTypes = {
  leaderboard: PropTypes.object.isRequired,
};

export default withRouter(LeaderboardAdmin);
