import React from 'react';
import PropTypes from 'prop-types';

const GuestBookItem = (props) => {
    return (
        <div className="item-wrap">
            <div className="name">{props.item.name}</div>
            <div className="date">{props.item.date}</div>
            <div className="desc">{props.item.desc}</div>
            {/*<button onClick={props.editFn} data-key={props.item.key}>edit</button>
            <button onClick={props.deleteFn} data-key={props.item.key}>delete</button>*/}
        </div>
    );
};

GuestBookItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        desc: PropTypes.string,
        date: PropTypes.string.isRequired,
    }),
    editFn: PropTypes.func.isRequired,
    deleteFn: PropTypes.func.isRequired,
};

export default React.memo(GuestBookItem);
