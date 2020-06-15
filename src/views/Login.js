import React from 'react';
import * as firebase from 'firebase';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login() {
        let id = this.refs.id.value;
        let database = firebase.database();
        database.ref('user/' + id).once('value').then((user) => {
            let userVal = user.val();

            if (userVal && userVal.id === id && userVal.pwd === this.refs.pwd.value) {
                alert('로그인 성공!');
            }else {
                alert('로그인 실패!');
            }
        });
    }

    render() {
        return (
            <div className="login-view">
                <input ref="id" placeholder="id" type="text"/>
                <input ref="pwd" placeholder="pwd" type="password"/>
                <button onClick={this.login}>login</button>
            </div>
        );
    }
}

export default Login;
