import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { database as firebaseDatabase, storage as firebaseStorage} from 'firebase';
import $ from 'jquery';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useAlert } from 'react-alert';
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert';

import GalleryItem from './GalleryItem';

const Gallery = () => {
    const database = firebaseDatabase();
    const storage = firebaseStorage();
    
    const [items, setItems] = useState({});
    const [detail, setDetail] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [detailMode, setDetailMode] = useState(false);

    const alert = useAlert()

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
        e.stopPropagation();

        const key = e.currentTarget.getAttribute('data-key');

        confirmAlert({
            message: '삭제하시겠습니까?',
            buttons: [
              {
                label: '확인',
                onClick: () => {
                    database.ref('gallery/' + key).remove()
                    .then(() => {
                        alert.show('삭제 성공', {
                            type: 'success',
                            timeout: 2000,
                        });
                    })
                    .catch(() => {
                        alert.show('삭제 실패', {
                            type: 'error',
                            timeout: 2000,
                        });
                    });
                }
              },
              {
                label: '취소',
                onClick: () => { }
              }
            ]
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
                    alert.show('수정 성공', {
                        type: 'success',
                        timeout: 2000,
                    });
                    setEditMode(false);
                })
                .catch(() => {
                    alert.show('수정 실패', {
                        type: 'error',
                        timeout: 2000,
                    });
                });
        } else {
            // 추가
            let newDetailKey = uuid();
            newDetail.key = newDetailKey;
            
            database.ref('gallery/' + newDetailKey).set(newDetail)
                .then(() => {
                    alert.show('추가 성공', {
                        type: 'success',
                        timeout: 2000,
                    });
                    setEditMode(false);
                })
                .catch(() => {
                    alert.show('추가 실패', {
                        type: 'error',
                        timeout: 2000,
                    });
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

        storage.ref().child(`images/${fileName}`).put(selectedFile)
            .then((snapshot) => {
                alert.show('이미지 추가 성공', {
                    type: 'success',
                    timeout: 2000,
                });

                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setDetail({
                        ...detail,
                        image: downloadURL
                    });
                });
            })
            .catch(() => {
                alert.show('이미지 추가 실패', {
                    type: 'error',
                    timeout: 2000,
                });
            });
    }, [detail]);


    // render 
    let itemHtmlList = useMemo(() => {
        let itemHtmlList = {
            0: [],
            1: [],
            2: [],
            3: [],
        }
        let itemKey = 0;

        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
    
                itemHtmlList[itemKey].push(<GalleryItem key={key} item={item} editFn={editFn} deleteFn={deleteFn} detailFn={detailFn}/>);
                itemKey ++;
                (itemKey === 4) && (itemKey = 0);
            }
        }

        return itemHtmlList;
    }, [items]);

    return (
        <div className="gallery-wrap">
            { 
                Cookies.get('authToken') === 'admin' &&
                !editMode && 
                <div className="add-btn-wrap">
                    <button onClick={addFn}>추가</button>
                </div>
             }
            {
                editMode ?
                    <form className='form-wrap'>
                        <div className="form-item">
                            <label>이름</label>
                            <input name="title" value={detail.title} onChange={changeDetailFn}/>
                        </div>
                        <div className="form-item">
                            <label>이미지</label>
                            <input type="file" accept="image/*" name="image" onChange={uploadImageFn} />
                            <button onClick={openUploadImagePopupFn}>업로드</button>
                        </div>
                        <div className='form-center-item'>
                            {
                                detail.image && <img src={detail.image} width="200"></img>
                            }
                        </div>
                        <div className='form-center-item'>
                            <button onClick={saveFn}>저장</button>
                        </div>
                    </form>
                    :
                    <div className="list-wrap">
                        <div>{itemHtmlList[0]}</div>
                        <div>{itemHtmlList[1]}</div>
                        <div>{itemHtmlList[2]}</div>
                        <div>{itemHtmlList[3]}</div>
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
