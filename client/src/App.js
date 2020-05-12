import React from 'react';
import AppNavbar from './components/AppNavbar';
import TeamList from './components/TeamList';
import PlayerList from './components/PlayerList';
import TeamModal from './components/TeamModal';
import PlayerModal from './components/PlayerModal';
import AboutModal from './components/AboutModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <TeamModal />
          <TeamList />
        </Container>
        <Container>
          <PlayerModal />
          <PlayerList />
        </Container>
        <Container>
          <AboutModal />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
