import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Login from 'views/Login';
import Join from 'views/Join';
import Main from 'views/Main';

// firebase setting
initializeApp({
    apiKey: "AIzaSyANJcTL5OSYVkWhJ2x1on4w242qq_AcqRY",
    authDomain: "yang-gallery.firebaseapp.com",
    databaseURL: "https://yang-gallery.firebaseio.com",
    projectId: "yang-gallery",
    storageBucket: "yang-gallery.appspot.com",
    messagingSenderId: "1054961998752",
    appId: "1:1054961998752:web:754a332c24ff3c244f22c5"
});

const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

const App = () => {
    return (
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
            <Switch>
                  <Route exact path='/login' component={Login}/>
                  <Route exact path='/join' component={Join}/>
                  <Route path='/' component={Main}/>
            </Switch>
        </Router>
        </AlertProvider>
    );
}
  
// render
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
