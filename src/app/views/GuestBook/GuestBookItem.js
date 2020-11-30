import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'

const GuestBookItem = (props) => {
    const userState = useSelector((state) => state.user)

    return (
        <div className="item-wrap">
            <div className="name">{props.item.name}</div>
            <div className="date">{props.item.date}</div>
            <div className="desc">{props.item.desc}</div>
            {userState.id === 'admin' && <div>
                <button onClick={props.editFn} data-key={props.item.key}>수정</button>
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
    editFn: PropTypes.func.isRequired,
    deleteFn: PropTypes.func.isRequired,
};

export default React.memo(GuestBookItem);
