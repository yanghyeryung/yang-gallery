import React from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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

                    </div>
                    <ul className="header-icon-wrap">
                        <li>
                            <a href="" className="" />
                        </li>
                        <li>
                            <a href="" className="" />
                        </li>
                        <li>
                            <a href="" className="" />
                        </li>
                        <li>
                            <a href="" className="" />
                        </li>
                    </ul>
                </div>

                <button onClick={this.changeMode} data-mode="gallery">Gallery</button>
                <button onClick={this.changeMode} data-mode="guestbook">GuestBook</button>
                {activeTabMode === 'gallery' && <Gallery />}
                {activeTabMode === 'guestbook' && <GuestBook />}
            </div>
        );
    }
}

export default Main;
