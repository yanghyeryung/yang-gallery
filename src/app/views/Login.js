import React from 'react';
import * as firebase from 'firebase';
import Cookies from 'js-cookie';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault();

        const id = this.refs.id.value;
        const database = firebase.database();
        const {history} = this.props;

        database.ref('user/' + id).once('value').then((user) => {
            let userVal = user.val();

            if (userVal && userVal.id === id && userVal.pwd === this.refs.pwd.value) {
                Cookies.set('authToken', userVal.id);
                history.push('/');
            }else {
                alert('로그인 실패!');
            }
        });
    }

    render() {
        return (
            <form className="login-wrap">
                <label>
                    <span className="title">YANG</span>
                    GALLERY
                </label>
                <input ref="id" type="text" placeholder="ID"/>
                <input ref="pwd" type="password" placeholder="PASSWORD"/>
                <button onClick={this.login}>LOGIN</button>
            </form>
        );
    }
}

export default Login;
