import React from 'react';
import * as firebase from 'firebase';
import Cookies from 'js-cookie';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login() {
        const id = this.refs.id.value;
        const database = firebase.database();
        const {history} = this.props;
        database.ref('user/' + id).once('value').then((user) => {
            let userVal = user.val();

            if (userVal && userVal.id === id && userVal.pwd === this.refs.pwd.value) {
                Cookies.set('authToken', userVal.id);
                history.push("/");
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
