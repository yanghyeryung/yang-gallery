import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { database as firebaseDatabase} from 'firebase';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useAlert } from 'react-alert';
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert';

import GuestBookItem from './GuestBookItem';

const GuestBook = () => {
    const database = firebaseDatabase();

    const authToken = useMemo(() => Cookies.get('authToken'), [])

    const [items, setItems] = useState({});
    const [detail, setDetail] = useState({
        name: authToken,
    });

    const alert = useAlert()

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

    const deleteFn = useCallback((e) => {
        e.stopPropagation();

        const key = e.currentTarget.getAttribute('data-key');

        confirmAlert({
            message: '삭제하시겠습니까?',
            buttons: [
              {
                label: '확인',
                onClick: () => {
                    database.ref('guestbook/' + key).remove()
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

        // 추가
        let newDetailKey = uuid();
        newDetail.key = newDetailKey;

        database.ref('guestbook/' + newDetailKey).set(newDetail)
            .then(() => {
                alert.show('추가 성공', {
                    type: 'success',
                    timeout: 2000,
                });
                setDetail({
                    name: authToken,
                })
            })
            .catch(() => {
                alert.show('추가 실패', {
                    type: 'error',
                    timeout: 2000,
                });
            });
    }, [detail, items]);

    const changeDetailFn = useCallback((e) => {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value
        });
    }, [detail]);

    // render
    let itemHtmlList = useMemo(() => {
        let itemHtmlList = [];

        for (let key in items) {
            if (items.hasOwnProperty(key)) {
                let item = items[key];
                itemHtmlList.push(<GuestBookItem key={key} item={item} deleteFn={deleteFn}/>);
            }
        }

        return itemHtmlList;
    }, [items]);

    return (
        <div className="guest-book-wrap">
            <form>
                <div className="input-wrap">
                    <div className="form-item">
                        <label>이름</label>
                        <input name="name" value={detail.name ? detail.name : ''} onChange={changeDetailFn} disabled={authToken}/>
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
