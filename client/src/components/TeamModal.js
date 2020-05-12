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
import { addTeam } from '../actions/teamActions';

class TeamModal extends Component {
  state = {
    modal: false,
    name: ''
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

    const newTeam = {
      name: this.state.name
    }

    this.props.addTeam(newTeam);

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
          Add Team
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add to Team List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="team">Team</Label>
                <Input
                  type="text"
                  name="name"
                  id="team"
                  placeholder="Add Team"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  style={{marginTop: '2rem'}}
                  block
                >
                  Add Team
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
  team: state.team
});

export default connect(mapStateToProps, { addTeam })(TeamModal);
