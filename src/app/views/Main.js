import React, { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faImage, faBook } from '@fortawesome/free-solid-svg-icons';
import useReactRouter from 'use-react-router'

import Gallery from './Gallery';
import GuestBook from './GuestBook';

const Main = () => {
    const { history } = useReactRouter()
    const [activeTabMode, setActiveTabMode] = useState('gallery');

    const logoutFn = useCallback(() => {
        Cookies.remove('authToken');
        moveLoginPage();
    }, []);

    const moveLoginPage = useCallback(() => {
        history.push('/login');
    }, []);

    const changeModeFn = useCallback((e) => {
        const mode = e.currentTarget.getAttribute('data-mode');

        setActiveTabMode(mode);
    }, []);

    return (
        <div className="main-wrap">
            <div className="header">
                <div className="header-btn-wrap">
                {
                    Cookies.get('authToken')?
                    <button className="icon-btn" onClick={logoutFn}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                    :
                    <button className="icon-btn" onClick={moveLoginPage}>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                }
                </div>

                <div className="header-picture-wrap">
                    <div className="heart"></div>
                    <div className="cheek left"></div>
                    <div className="cheek right"></div>
                    <img src="./images/yang.jpeg" alt="yang"></img>
                </div>
                <div className="header-desc-wrap">
                    양혜령 그림을 볼 수 있는 갤러리입니다.
                </div>

                <button className={activeTabMode === 'gallery'? "tab-btn on" : "tab-btn"} onClick={changeModeFn} data-mode="gallery">
                    <FontAwesomeIcon icon={faImage} /> 갤러리
                </button>
                <button className={activeTabMode === 'guestbook'? "tab-btn on" : "tab-btn"}  onClick={changeModeFn} data-mode="guestbook">
                    <FontAwesomeIcon icon={faBook} /> 방명록
                </button>
            </div>

            {activeTabMode === 'gallery' && <Gallery />}
            {activeTabMode === 'guestbook' && <GuestBook />}
        </div>
    );
}

export default React.memo(Main);
