import React, { useCallback, useRef } from 'react'
import * as firebase from 'firebase';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';
import useReactRouter from 'use-react-router'
import { useDispatch } from 'react-redux'

import { setUser } from 'store/user'

const Login = () => {
    const { history } = useReactRouter()
    const alert = useAlert()
    const dispatch = useDispatch()
    
    const userActions = {
        setUser: (data) => dispatch(setUser(data)),
    };
    
    const idEl = useRef(null);
    const pwEl = useRef(null);

    const loginFn = useCallback((e) => {
        e.preventDefault();

        const id = idEl.current.value;
        const database = firebase.database();

        database.ref('user/' + id).once('value').then((user) => {
            let userVal = user.val();

            if (userVal && userVal.id === id && userVal.pwd === pwEl.current.value) {
                userActions.setUser(userVal.id)
                Cookies.set('authToken', userVal.id);
                history.push('/');
            } else {
                alert.show('로그인 실패', {
                    type: 'error',
                    timeout: 2000,
                });
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
