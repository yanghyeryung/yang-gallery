import React from 'react';
import PropTypes from 'prop-types';

class Art extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {art, editFn, deleteFn} = this.props;
        return (
            <div className="art-wrap">
                <div className="title">{art.title}</div>
                <img src={art.image} width="300"></img>
                <div className="desc">{art.desc}</div>
                <div className="date">{art.date}</div>
                <button onClick={editFn} data-key={art.key}>edit</button>
                <button onClick={deleteFn} data-key={art.key}>delete</button>
            </div>
        );
    }
}

Art.propTypes = {
    art: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        desc: PropTypes.string,
        date: PropTypes.string.isRequired,
    }),
    editFn: PropTypes.func.isRequired,
    deleteFn: PropTypes.func.isRequired,
};

export default Art;
