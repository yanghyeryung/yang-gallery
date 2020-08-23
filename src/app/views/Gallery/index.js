import React, { useCallback, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import $ from 'jquery';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import GalleryItem from './GalleryItem';

const Gallery = (props) => {

    const database = firebase.database();
    const storage = firebase.storage().ref();
    
    const [items, setItems] = useState({});
    const [detail, setDetail] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [detailMode, setDetailMode] = useState(false);

    useEffect(() => {
        database.ref('gallery').on('value', (galleryItems) => {
            let itemMap = {};
            let itemsArray = [];

            galleryItems.forEach((item) => {
                itemsArray.push(item.val());
            });

            itemsArray.sort((a, b) => { return moment(b.date) - moment(a.date) }).map((item) => {
                itemMap[item.key] = item;
            });

            setItems(itemMap);
        });

        return () => {
            database.ref('gallery').off('value');
        };
    }, []);
 
    const addFn = useCallback(() => {
        setEditMode(true);
        setDetail({});
    }, []);

    const editFn = useCallback((e) => {
        let key = e.currentTarget.getAttribute('data-key');

        setEditMode(true);
        setDetail({
            ...items[key],
        });
    }, [items]);

    const deleteFn = useCallback((e) => {
        let key = e.currentTarget.getAttribute('data-key');

        database.ref('gallery/' + key).remove()
            .then(() => {
                alert('삭제 성공');
            })
            .catch(() => {
                alert('삭제 실패');
            });
    }, []);

    const saveFn = useCallback((e) => {
        e.preventDefault();

        let newDetail = {
            date: moment().format('YYYY/MM/DD hh:mm:ss'),
            ... detail
        }

        if (newDetail.key) {
            // 수정
            database.ref('gallery/' + newDetail.key).set(newDetail)
                .then(() => {
                    alert('수정 성공');
                    setEditMode(false);
                })
                .catch(() => {
                    alert('수정 실패');
                });
        } else {
            // 추가
            let newDetailKey = uuid();
            newDetail.key = newDetailKey;
            
            let newItems = {
                [newDetailKey]: newDetail,
                ...items
            }

            database.ref('gallery').set(newItems)
                .then(() => {
                    alert('추가 성공');
                    setEditMode(false);
                })
                .catch(() => {
                    alert('추가 실패');
                });
        }
    }, [detail, items]);

    const detailFn = useCallback((e) => {
        let key = e.currentTarget.getAttribute('data-key');

        setDetail({
            ...items[key]
        });
        setDetailMode(true);
    }, [items]);

    const closeDetailFn = useCallback(() => {
        setDetailMode(false);
    }, []);

    const changeDetailFn = useCallback((e) => {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value
        });
    }, [detail]);

    const openUploadImagePopupFn = useCallback((e) => {
        e.preventDefault();
        $(e.currentTarget).siblings('input').click();
    }, []);

    const uploadImageFn = useCallback((e) => {
        const selectedFile = e.target.files[0];
        const fileName = selectedFile.name;

        storage.child(`images/${fileName}`).put(selectedFile)
            .then((snapshot) => {
                alert('이미지 추가 성공');

                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setDetail({
                        ...detail,
                        image: downloadURL
                    });
                });
            })
            .catch(() => {
                alert('이미지 추가 실패');
            });
    }, [detail]);


    // render 
    let itemHtmlList = {
        0: [],
        1: [],
        2: [],
    };

    let itemKey = 0;
    
    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            let item = items[key];

            itemHtmlList[itemKey].push(<GalleryItem key={key} item={item} editFn={editFn} deleteFn={deleteFn} detailFn={detailFn}/>);
            itemKey ++;
            (itemKey === 3) && (itemKey = 0);
        }
    }

    return (
        <div className="gallery-wrap">
            {/*!editMode && <button className="btn" onClick={addFn}>+</button>*/}
            {
                editMode ?
                    <form>
                        <div className="form-item">
                            <label>title</label>
                            <input name="title" value={detail.title} onChange={changeDetailFn}/>
                        </div>
                        <div className="form-item">
                            <label>image</label>
                            <input type="file" accept="image/*" name="image" onChange={uploadImageFn} />
                            <button onClick={openUploadImagePopupFn}>upload</button>
                            {
                                detail.image && <img src={detail.image} width="300"></img>
                            }
                        </div>
                        <button onClick={saveFn}>save</button>
                    </form>
                    :
                    <div className="list-wrap">
                        <div>{itemHtmlList[0]}</div>
                        <div>{itemHtmlList[1]}</div>
                        <div>{itemHtmlList[2]}</div>
                        {
                            detailMode && <div className="detail-wrap" onClick={closeDetailFn}>
                                <div className="detail-conts">
                                    <img className={detailMode && "on"} src={detail.image}></img>
                                </div>
                            </div>
                        }
                    </div>
            }
        </div>
    );
}

export default React.memo(Gallery);
