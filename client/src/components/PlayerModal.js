import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPlayer } from '../actions/playerActions';

class PlayerModal extends Component {
  state = {
    modal: false,
    name: '',
    pac: 10,
    sho: 10,
    pas: 10,
    dri: 10,
    def: 10,
    phy: 10
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newPlayer = {
      name: this.state.name,
      pac: this.state.pac,
      sho: this.state.sho,
      pas: this.state.pas,
      dri: this.state.dri,
      def: this.state.def,
      phy: this.state.phy

    }

    this.props.addPlayer(newPlayer);

    this.toggle();
  }

  render(){
    return(
      <div>
        <Button
        color="dark"
        style={{marginBottom: '2rem'}}
        onClick={this.toggle}
        >
          Add Player
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add to Player List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="player">Player</Label>
                <Input
                  type="text"
                  name="name"
                  id="player"
                  placeholder="Add Player"
                  onChange={this.onChange}
                />
                <Label for="player">Pace</Label>
                <Input
                  type="text"
                  name="name"
                  id="pac"
                  placeholder="Add Player Pace"
                  onChange={this.onChange}
                /><Label for="player">Shooting</Label>
                <Input
                  type="text"
                  name="name"
                  id="sho"
                  placeholder="Add Player Shooting"
                  onChange={this.onChange}
                /><Label for="player">Passing</Label>
                <Input
                  type="text"
                  name="name"
                  id="pas"
                  placeholder="Add Player Passing"
                  onChange={this.onChange}
                /><Label for="player">Dribbling</Label>
                <Input
                  type="text"
                  name="name"
                  id="dri"
                  placeholder="Add Player Dribbling"
                  onChange={this.onChange}
                /><Label for="player">Defending</Label>
                <Input
                  type="text"
                  name="name"
                  id="def"
                  placeholder="Add Player Defending"
                  onChange={this.onChange}
                /><Label for="player">Physical</Label>
                <Input
                  type="text"
                  name="name"
                  id="phy"
                  placeholder="Add Player Physical"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Add Player
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  pac: state.pac,
  sho: state.sho,
  pas: state.pas,
  dri: state.dri,
  def: state.def,
  phy: state.phy
});

export default connect(mapStateToProps, { addPlayer })(PlayerModal);
