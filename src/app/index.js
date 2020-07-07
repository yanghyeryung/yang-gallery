import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase';

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

// render
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
