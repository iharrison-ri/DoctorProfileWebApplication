import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//the Provider component passes down the state to each component
import {Provider} from './store';
import Loading from './components/Loading';
import Profile from './components/Profile';
import Edit from './components/Edit';
import Search from './components/Search';

class App extends Component {
    render() {
        return (
            <Provider>
                <div className="profileContainer">
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Loading}></Route>
                            <Route exact path='/search' component={Search}></Route>
                            <Route exact path='/profile' component={Profile}></Route>
                            <Route exact path='/edit' component={Edit}></Route>
                        </Switch>
                    </Router>
                </div>
            </Provider>
        );
    }
}

export default App;
