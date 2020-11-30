import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'

const GalleryItem = (props) => {
    const userState = useSelector((state) => state.user)

    return (
        <div className="item-wrap" onClick={props.detailFn} data-key={props.item.key}>
            <img src={props.item.image} width="300"></img>
            <div className="title">{props.item.title}</div>
            {userState.id === 'admin' && <div>
                <button onClick={props.editFn} data-key={props.item.key}>수정</button>
                <button onClick={props.deleteFn} data-key={props.item.key}>삭제</button>
            </div>}
        </div>
    );
}

GalleryItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }),
    editFn: PropTypes.func.isRequired,
    deleteFn: PropTypes.func.isRequired,
    detailFn: PropTypes.func.isRequired,
};

export default React.memo(GalleryItem);
