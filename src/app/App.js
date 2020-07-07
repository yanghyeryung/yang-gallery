import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './views/Login';
import Main from './views/Main';

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path='/login' render={(props) => (
                  Cookies.get('authToken') ? <Redirect to='/'/> : <Login {...props}/>
              )}/>
              <Route render={(props) => (
                  Cookies.get('authToken') ? <Main {...props}/> : <Redirect to='/login'/>
              )}/>
          </Switch>
      </Router>
  );
}

export default App;
