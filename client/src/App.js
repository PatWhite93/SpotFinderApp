import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

import { AuthProvider } from './context/auth';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Map from './pages/Map';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/map" component={Map} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
