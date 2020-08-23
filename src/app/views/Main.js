import React, { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faImage, faBook } from '@fortawesome/free-solid-svg-icons';

import Gallery from './Gallery';
import GuestBook from './GuestBook';

const Main = (props) => {

    const [activeTabMode, setActiveTabMode] = useState('gallery');
    const [searchMode, setSearchMode] = useState(false);

    const showSearchArtFn = useCallback(() => {
        setSearchMode(true);
    }, []);

    const hideSearchArtFn = useCallback(() => {
        setSearchMode(false);
    }, []);

    const searchArtFn = useCallback((e) => {
        if (e.key === 'Enter') {
        }
    }, []);

    const logoutFn = useCallback(() => {
        Cookies.remove('authToken');
        props.history.push('/login');
    }, []);

    const changeModeFn = useCallback((e) => {
        const mode = e.currentTarget.getAttribute('data-mode');

        setActiveTabMode(mode);
    }, []);

    return (
        <div className="main-wrap">
            <div className="header">
                {/*
                    searchMode ?
                        <div className="search-wrap">
                            <input ref="search" onKeyDown={searchArtFn}/>
                            <button onClick={hideSearchArtFn}>x</button>
                        </div>
                        :
                        <button onClick={showSearchArtFn}>search</button>
                */}
                <div className="header-btn-wrap">
                    <button className="icon-btn" onClick={logoutFn}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
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
