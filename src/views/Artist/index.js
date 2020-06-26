import React from 'react';

class Artist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="artist-wrap">
                <div>yanghyeryung@gmail.com</div>
                <div>https://yanghyeryung.github.io</div>
                <div>https://github.com/yanghyeryung</div>
            </div>
        );
    }
}

export default Artist;
