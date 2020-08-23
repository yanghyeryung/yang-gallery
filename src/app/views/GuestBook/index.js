import React, { useCallback, useState, useEffect } from 'react';
import * as firebase from 'firebase';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

import GuestBookItem from './GuestBookItem';

const GuestBook = (props) => {
    const database = firebase.database();

    const [items, setItems] = useState({});
    const [detail, setDetail] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        database.ref('guestbook').on('value', (guestbookItems) => {
            let itemMap = {};
            let itemsArray = [];

            guestbookItems.forEach((item) => {
                itemsArray.push(item.val());
            });

            itemsArray.sort((a, b) => { return moment(b.date) - moment(a.date) }).map((item) => {
                itemMap[item.key] = item;
            });

            setItems(itemMap);
        });

        return () => {
            database.ref('guestbook').off('value');
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

        database.ref('guestbook/' + key).remove()
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
            database.ref('guestbook/' + newDetail.key).set(newDetail)
                .then(() => {
                    alert('수정 성공');
                    setEditMode(false);
                })
                .catch(() => {
                    alert('수정 실패');
                });
        } else {
            // 추가
            let newItems = {
                [uuid()]: newDetail,
                ...items
            }

            database.ref('guestbook').set(newItems)
                .then(() => {
                    alert('추가 성공');
                    setEditMode(false);
                    setDetail({})
                })
                .catch(() => {
                    alert('추가 실패');
                });
        }
    }, [detail, items]);

    const changeDetailFn = useCallback((e) => {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value
        });
    }, [detail]);

    // render
    let itemHtmlList = [];

    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            let item = items[key];
            itemHtmlList.push(<GuestBookItem key={key} item={item} editFn={editFn} deleteFn={deleteFn}/>);
        }
    }

    return (
        <div className="guest-book-wrap">
            <form>
                <div className="input-wrap">
                    <div className="form-item">
                        <label>이름</label>
                        <input name="name" value={detail.name ? detail.name : ''} onChange={changeDetailFn}/>
                    </div>
                    <div className="form-item">
                        <label>내용</label>
                        <textarea name="desc" value={detail.desc ? detail.desc : ''} onChange={changeDetailFn}>
                    </textarea>
                    </div>
                </div>
                <div className="btn-wrap">
                    <button onClick={saveFn}>저장</button>
                </div>
            </form>
            <div className="list-wrap">
                {itemHtmlList}
            </div>
        </div>
    );
}

export default React.memo(GuestBook);
