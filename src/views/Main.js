import React from 'react';
import Gallery from './Gallery';
import GuestBook from './GuestBook';
import Artist from './Artist';

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
            <div className="main-wrap">
                <div className="header">
                    <span className="title">YangGallery</span>
                </div>
                <button onClick={this.changeMode} data-mode="gallery">Gallery</button>
                <button onClick={this.changeMode} data-mode="guestbook">GuestBook</button>
                <button onClick={this.changeMode} data-mode="artist">Artist</button>
                {this.state.activeTabMode === 'gallery' && <Gallery />}
                {this.state.activeTabMode === 'guestbook' && <GuestBook />}
                {this.state.activeTabMode === 'artist' && <Artist />}
            </div>
        );
    }
}

export default Main;
