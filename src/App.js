import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './views/Login';
import Main from './views/Main';


function App() {
  return (
    <div className="app-view">
        <Router>
            <Switch>
                <Route exact path='/login' component={Login} />
                <Route render={() => (
                    Cookies.get('authToken') ? <Main /> : <Redirect to='/login'/>
                )}/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
