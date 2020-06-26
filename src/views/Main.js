import React from 'react';
import Cookies from 'js-cookie';

import Gallery from './Gallery';
import GuestBook from './GuestBook';
import Artist from './Artist';

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
                    <span className="title">YangGallery</span>
                    {
                        searchMode ?
                            <div className="search-wrap">
                                <input ref="search" onKeyDown={this.searchArt}/>
                                <button onClick={this.hideSearchArt}>x</button>
                            </div>
                            :
                            <button onClick={this.showSearchArt}>search</button>
                    }
                    <button onClick={this.logout}>logout</button>
                </div>
                <button onClick={this.changeMode} data-mode="gallery">Gallery</button>
                <button onClick={this.changeMode} data-mode="guestbook">GuestBook</button>
                <button onClick={this.changeMode} data-mode="artist">Artist</button>
                {activeTabMode === 'gallery' && <Gallery />}
                {activeTabMode === 'guestbook' && <GuestBook />}
                {activeTabMode === 'artist' && <Artist />}
            </div>
        );
    }
}

export default Main;
