import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Table } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPlayers, deletePlayer } from '../actions/playerActions';
import PropTypes from 'prop-types';

class PlayerList extends Component {

  componentDidMount() {
    this.props.getPlayers();
  }

  onDeleteClick = (id) => {
    this.props.deletePlayer(id);
  }

  render() {
    const { players } = this.props.player;
    return(
      <Container>

        <ListGroup>
          <TransitionGroup className="player-list">
            {players.map(({ _id, player, pac, sho, pas, dri, def, phy }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="removeBtn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Pace</th>
                        <th>Shooting</th>
                        <th>Passing</th>
                        <th>Dribbling</th>
                        <th>Defending</th>
                        <th>Physical</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{player}</th>
                        <td>{pac}</td>
                        <td>{sho}</td>
                        <td>{pas}</td>
                        <td>{dri}</td>
                        <td>{def}</td>
                        <td>{phy}</td>
                      </tr>
                    </tbody>
                    </Table>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

PlayerList.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  player: state.player,
  pac: state.pac,
  sho: state.sho,
  pas: state.pas,
  dri: state.dri,
  def: state.def,
  phy: state.phy
});

export default connect(mapStateToProps, { getPlayers, deletePlayer })(PlayerList);
