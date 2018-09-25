import React, { Component } from 'react';

import { Provider } from './store';

import Profile from './components/Profile';
import Edit from './components/Edit';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="container flexRow">
          <div className="profileContainer">
            <Profile />
            {/* <Edit /> */}
            {/* <Search /> */}
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
