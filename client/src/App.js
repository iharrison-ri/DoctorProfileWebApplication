import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from './store';

import Profile from './components/Profile';
import Edit from './components/Edit';
import Search from './components/Search';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="container flexRow">
          <div className="profileContainer">
            <Router>
              <Switch>
                <Route
                  exact
                  path='/'
                  component={Search}
                ></Route>
                <Route
                  exact
                  path='/profile/:index'
                  component={Profile}
                ></Route>
                <Route
                  exact
                  path='/edit/:index'
                  component={Edit}
                ></Route>
              </Switch>
            </Router>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
