import React, { useCallback, useRef } from 'react'
import { database as firebaseDatabase} from 'firebase';
import { useAlert } from 'react-alert';
import useReactRouter from 'use-react-router'

const Join = () => {
    const { history } = useReactRouter()
    const alert = useAlert()
    
    const idEl = useRef(null);
    const emailEl = useRef(null);
    const pwEl = useRef(null);
    const rePwEl = useRef(null);

    const joinFn = useCallback((e) => {
        e.preventDefault();

        const id = idEl.current.value;
        const email = emailEl.current.value;
        const pw = pwEl.current.value;
        const rePw = rePwEl.current.value;

        // 이메일 형식 확인
        const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!emailRule.test(email)) {
            alert.show('이메일을 확인해주세요.', {
                type: 'error',
                timeout: 2000,
            });
            return;
        }

        // 비밀번호 포맷 확인
        const pwRule = /^[A-Za-z0-9]{5,12}$/;
        if (!pwRule.test(pw)) {
            alert.show('비밀번호는 숫자, 문자 포함 형태의 5-12자리로 입력해주세요.', {
                type: 'error',
                timeout: 2000,
            });
            return;
        }

        // 비밀번호 일치 확인
        if (pw !== rePw) {
            alert.show('비밀번호와 비밀번호 확인 값을 동일하게 입력해주세요.', {
                type: 'error',
                timeout: 2000,
            });
            return;
        }

        const newUser = {
            id,
            email,
            pw,
        }

        const database = firebaseDatabase();
        database.ref('user/' + id).set(newUser)
            .then((user) => {
                alert.show('회원가입 성공', {
                    type: 'success',
                    timeout: 2000,
                });
                history.push('/login');
             }).catch(() => {
                alert.show('회원가입 실패', {
                    type: 'error',
                    timeout: 2000,
                });
            })
    }, []);

    const moveLoginFn = useCallback(() => {
        history.push('/login');
    }, [])

    return (
        <form className="login-wrap join-wrap">
            <label>
                <span className="title">YANG</span>
                GALLERY
            </label>
            <input ref={idEl} type="text" placeholder="아이디" />
            <input ref={emailEl} type="text" placeholder="이메일"/>
            <input ref={pwEl} type="password" placeholder="비밀번호" />
            <input ref={rePwEl} type="password" placeholder="비밀번호 확인"/>
            <button onClick={joinFn}>회원가입</button>
            <a onClick={moveLoginFn}>로그인</a>
        </form>
    );
};

export default React.memo(Join);
