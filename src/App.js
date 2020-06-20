import React from 'react';
import './App.css';
// import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navigation';

function App() {
  return (
    <Router>
    <div className="">
      <header className="">
        <Navbar />
      </header>
      <Home />
      {/* <Switch>
        <Route path="/" exact component={Home} />
      </Switch> */}
    </div>
    </Router>
  );
}

export default App;
