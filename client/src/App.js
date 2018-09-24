import React, { Component } from 'react';

import { Provider } from './store';

import ProfileTop from './components/ProfileTop';
import ProfileBottom from './components/ProfileBottom';
import EditPage from './components/EditPage';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="container flexRow">
          <div className="profileContainer">
            {/* <ProfileTop />
            <ProfileBottom /> */}
            <EditPage />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
