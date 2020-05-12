import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getTeams, deleteTeam } from '../actions/teamActions';
import PropTypes from 'prop-types';

class TeamList extends Component {

  componentDidMount() {
    this.props.getTeams();
  }

  onDeleteClick = (id) => {
    this.props.deleteTeam(id);
  }

  render() {
    const { teams } = this.props.team;
    return(
      <Container>
        <ListGroup>
          <TransitionGroup className="team-list">
          {teams.map(({ _id, name }) => (
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
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

TeamList.propTypes = {
  getTeams: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  team: state.team
});

export default connect(mapStateToProps, { getTeams, deleteTeam })(TeamList);
