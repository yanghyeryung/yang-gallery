import React, { useCallback, useRef } from 'react'
import * as firebase from 'firebase';
import Cookies from 'js-cookie';

const Login = (props) => {

    const idEl = useRef(null);
    const pwEl = useRef(null);

    const loginFn = useCallback((e) => {
        e.preventDefault();

        const id = idEl.current.value;
        const database = firebase.database();

        database.ref('user/' + id).once('value').then((user) => {
            let userVal = user.val();

            if (userVal && userVal.id === id && userVal.pwd === pwEl.current.value) {
                Cookies.set('authToken', userVal.id);
                props.history.push('/');
            } else {
                alert('로그인 실패!');
            }
        });
    }, []);

    return (
        <form className="login-wrap">
            <label>
                <span className="title">YANG</span>
                GALLERY
            </label>
            <input ref={idEl} type="text" placeholder="ID"/>
            <input ref={pwEl} type="password" placeholder="PASSWORD"/>
            <button onClick={loginFn}>LOGIN</button>
        </form>
    );
};

export default React.memo(Login);
