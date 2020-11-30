import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';

import store from 'store'

import Login from 'views/Login';
import Main from 'views/Main';

// firebase setting
let firebaseConfig = {
    apiKey: "AIzaSyANJcTL5OSYVkWhJ2x1on4w242qq_AcqRY",
    authDomain: "yang-gallery.firebaseapp.com",
    databaseURL: "https://yang-gallery.firebaseio.com",
    projectId: "yang-gallery",
    storageBucket: "yang-gallery.appspot.com",
    messagingSenderId: "1054961998752",
    appId: "1:1054961998752:web:754a332c24ff3c244f22c5"
};
firebase.initializeApp(firebaseConfig);

const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE
}

const App = () => {
    return (
      <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
            <Switch>
                  <Route exact path='/login' component={Login}/>
                  <Route path='/' component={Main}/>
            </Switch>
        </Router>
        </AlertProvider>
        </Provider>
    );
}
  
// render
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
