import React from 'react';
import PropTypes from 'prop-types';

class Art extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {art, editFn, deleteFn, detailFn} = this.props;
        return (
            <div className="art-wrap" onClick={detailFn} data-key={art.key}>
                <img src={art.image} width="300"></img>
                <div className="title">{art.title}</div>
                { /*
                    <button onClick={editFn} data-key={art.key}>수정!</button>
                    <button onClick={deleteFn} data-key={art.key}>삭제</button>
                */ }
            </div>
        );
    }
}

Art.propTypes = {
    art: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }),
    editFn: PropTypes.func.isRequired,
    deleteFn: PropTypes.func.isRequired,
    detailFn: PropTypes.func.isRequired,
};

export default Art;
