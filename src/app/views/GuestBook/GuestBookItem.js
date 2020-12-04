import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const GuestBookItem = (props) => {
    return (
        <div className="item-wrap">
            <div className="name">{props.item.name}</div>
            <div className="date">{props.item.date}</div>
            <div className="desc">{props.item.desc}</div>
            {Cookies.get('authToken') === 'admin' && <div>
                <button onClick={props.deleteFn} data-key={props.item.key}>삭제</button>
            </div>}
        </div>
    );
};

GuestBookItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        desc: PropTypes.string,
        date: PropTypes.string.isRequired,
    }),
    deleteFn: PropTypes.func.isRequired,
};

export default React.memo(GuestBookItem);
