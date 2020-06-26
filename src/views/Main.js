import React from 'react';
import * as firebase from 'firebase';
import Gallery from './Gallery';
import GuestBook from './GuestBook';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTabMode: 'gallery',
        };

        this.changeMode = this.changeMode.bind(this);
    }

    changeMode(e) {
        let mode = e.currentTarget.getAttribute('data-mode');

        this.setState({
            activeTabMode: mode,
        });
    }

    render() {
        return (
            <div className="main-view">
                <div className="header">
                    <span className="title">YangGallery</span>
                </div>
                <button onClick={this.changeMode} data-mode="gallery">Gallery</button>
                <button onClick={this.changeMode} data-mode="guestbook">GuestBook</button>
                {this.state.activeTabMode === 'gallery' && <Gallery />}
                {this.state.activeTabMode === 'guestbook' && <GuestBook />}
            </div>
        );
    }
}

export default Main;
