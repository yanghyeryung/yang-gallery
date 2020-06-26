import React from 'react';
import * as firebase from 'firebase';

class Art extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const art = this.props.art;

        return (
            <div className="art-view">
                <div className="title">{art.title}</div>
                <div className="image">{art.image}</div>
                <div className="desc">{art.desc}</div>
                <div className="date">{art.date}</div>
                <button onClick={this.props.editFn} data-key={art.key}>edit</button>
                <button onClick={this.props.deleteFn} data-key={art.key}>delete</button>
            </div>
        );
    }
}

export default Art;
