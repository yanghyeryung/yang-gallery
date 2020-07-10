import React from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faImage, faBook } from '@fortawesome/free-solid-svg-icons';

import Gallery from './Gallery';
import GuestBook from './GuestBook';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTabMode: 'gallery',
            searchMode: false,
        };

        this.showSearchArt = this.showSearchArt.bind(this);
        this.hideSearchArt = this.hideSearchArt.bind(this);
        this.searchArt = this.searchArt.bind(this);
        this.logout = this.logout.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    showSearchArt() {
        this.setState({
            searchMode: true,
        });
    }

    hideSearchArt() {
        this.setState({
            searchMode: false,
        });
    }

    searchArt(e) {
        if (e.key === 'Enter') {
            alert(this.refs.search.value);
        }
    }

    logout() {
        const {history} = this.props;

        Cookies.remove('authToken');
        history.push('/login');
    }

    changeMode(e) {
        let mode = e.currentTarget.getAttribute('data-mode');

        this.setState({
            activeTabMode: mode,
        });
    }

    render() {
        const {activeTabMode, searchMode} = this.state;

        return (
            <div className="main-wrap">
                <div className="header">
                    {/*
                        searchMode ?
                            <div className="search-wrap">
                                <input ref="search" onKeyDown={this.searchArt}/>
                                <button onClick={this.hideSearchArt}>x</button>
                            </div>
                            :
                            <button onClick={this.showSearchArt}>search</button>
                    */}
                    <div className="header-btn-wrap">
                        <button className="icon-btn" onClick={this.logout}>
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

                    <button className={activeTabMode === 'gallery'? "tab-btn on" : "tab-btn"} onClick={this.changeMode} data-mode="gallery">
                        <FontAwesomeIcon icon={faImage} /> 갤러리
                    </button>
                    <button className={activeTabMode === 'guestbook'? "tab-btn on" : "tab-btn"}  onClick={this.changeMode} data-mode="guestbook">
                        <FontAwesomeIcon icon={faBook} /> 방명록
                    </button>
                </div>

                {activeTabMode === 'gallery' && <Gallery />}
                {activeTabMode === 'guestbook' && <GuestBook />}
            </div>
        );
    }
}

export default Main;
