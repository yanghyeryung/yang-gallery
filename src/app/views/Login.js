import React, { useCallback, useRef } from 'react'
import { database as firebaseDatabase} from 'firebase';
import Cookies from 'js-cookie';
import { useAlert } from 'react-alert';
import useReactRouter from 'use-react-router'

const Login = () => {
    const { history } = useReactRouter()
    const alert = useAlert()
    
    const idEl = useRef(null);
    const pwEl = useRef(null);

    const loginFn = useCallback((e) => {
        e.preventDefault();

        const id = idEl.current.value;
        const pw = pwEl.current.value;
        const database = firebaseDatabase();

        // 아이디 입력 확인
        if (!id) {
            alert.show('아이디를 입력해주세요.', {
                type: 'error',
                timeout: 2000,
            });
            return;
        }

        // 비밀번호 입력 확인
        if (!pw) {
            alert.show('비밀번호를 입력해주세요.', {
                type: 'error',
                timeout: 2000,
            });
            return;
        }

        database.ref('user/' + id).once('value').then((user) => {
            let userVal = user.val();

            if (userVal && userVal.id === id && userVal.pw === pw) {
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

    const moveJoinFn = useCallback(() => {
        history.push('/join');
    }, [])

    return (
        <form className="login-wrap">
            <label>
                <span className="title">YANG</span>
                GALLERY
            </label>
            <input ref={idEl} type="text" placeholder="아이디"/>
            <input ref={pwEl} type="password" placeholder="비밀번호" />
            <button onClick={loginFn}>로그인</button>
            <a onClick={moveJoinFn}>회원가입</a>
        </form>
    );
};

export default React.memo(Login);
