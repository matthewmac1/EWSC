/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AboutModal = (props) => {


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>About Page</Button>
      <Modal isOpen={modal} toggle={toggle} className="about">
        <ModalHeader toggle={toggle}>About Page</ModalHeader>
        <ModalBody>
        The purpose of this app was to allow the user to add players to teams which are all stored on the back end.
        <br></br><br></br>
        The user can add a team and then add players below it and then include the player's stats. The intention was for this to be a useful tracker for players of the video game FIFA to store their teams and have the app calculate their team ratings based on what is entered. This was not implemented.
        <br></br><br></br>
        No 3rd party libraries were used.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AboutModal;
