import React from 'react';
import * as firebase from 'firebase';
import $ from 'jquery';
import { v4 as uuid } from 'uuid';

import Art from './Art';

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arts: {},
            detail: {},
            editMode: false,
            detailMode: false,
        };

        this.database = firebase.database();
        this.storage = firebase.storage().ref();

        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.detail = this.detail.bind(this);
        this.closeDetail = this.closeDetail.bind(this);
        this.changeDetail = this.changeDetail.bind(this);
        this.openUploadImagePopup = this.openUploadImagePopup.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillMount() {
        this.database.ref('art').on('value', (arts) => {
            let artMap = {};

            arts.forEach((art) => {
                const artVal = art.val();

                artMap[art.key] = {
                    key: art.key,
                    title: artVal.title,
                    image: artVal.image,
                };
            });

            this.setState({
                arts: artMap,
            });
        });
    }

    componentWillUnmount() {
        this.database.ref('art').off('value');
    }

    add() {
        this.setState({
            editMode: true,
            detail: {},
        });
    }

    edit(e) {
        let key = e.currentTarget.getAttribute('data-key');

        this.setState({
            editMode: true,
            detail: Object.assign({}, this.state.arts[key]),
        });
    }

    delete(e) {
        let key = e.currentTarget.getAttribute('data-key');

        this.database.ref('art/' + key).remove()
            .then(() => {
                alert('삭제 성공');
            })
            .catch(() => {
                alert('삭제 실패');
            });
    }

    save(e) {
        e.preventDefault();

        let detail = Object.assign({}, this.state.detail);

        if (detail.key) {
            // 수정
            this.database.ref('art/' + detail.key).set(detail)
                .then(() => {
                    alert('수정 성공');
                    this.setState({
                        editMode: false,
                    });
                })
                .catch(() => {
                    alert('수정 실패');
                });
        } else {
            // 추가
            detail.key = uuid();

            let arts = Object.assign({[detail.key]: detail}, this.state.arts);

            this.database.ref('art').set(arts)
                .then(() => {
                    alert('추가 성공');
                    this.setState({
                        editMode: false,
                    });
                })
                .catch(() => {
                    alert('추가 실패');
                });
        }
    }

    detail(e) {
        let key = e.currentTarget.getAttribute('data-key');

        this.setState({
            detail: Object.assign({}, this.state.arts[key]),
            detailMode: true,
        });
    }

    closeDetail() {
        this.setState({
            detailMode: false,
        });
    }

    changeDetail(e) {
        this.setState({
            detail: Object.assign({}, this.state.detail, {[e.target.name]: e.target.value}),
        });
    }

    openUploadImagePopup(e) {
        e.preventDefault();
        $(e.currentTarget).siblings('input').click();
    }

    uploadImage(e) {
        const selectedFile = e.target.files[0];
        const fileName = selectedFile.name;

        this.storage.child(`images/${fileName}`).put(selectedFile)
            .then((snapshot) => {
                alert('이미지 추가 성공');

                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    let detail = Object.assign({}, this.state.detail, {image: downloadURL});
                    this.setState({
                        detail: detail,
                    });
                });
            })
            .catch(() => {
                alert('이미지 추가 실패');
            });
    }

    render() {
        const {detail, editMode, arts, detailMode} = this.state;
        const hideStyle = {display: 'none'};

        let artHtmlList = {
            0: [],
            1: [],
            2: [],
        };

        let artKey = 0;
        
        for (let key in arts) {
            if (arts.hasOwnProperty(key)) {
                let art = arts[key];

                artHtmlList[artKey].push(<Art key={key} art={art} editFn={this.edit} deleteFn={this.delete} detailFn={this.detail}/>);
                artKey ++;
                (artKey === 3) && (artKey = 0);
            }
        }

        return (
            <div className="gallery-wrap">
                {/*!editMode && <button className="btn" onClick={this.add}>+</button>*/}
                {
                    editMode ?
                        <form>
                            <div className="form-item">
                                <label>title</label>
                                <input name="title" value={detail.title} onChange={this.changeDetail}/>
                            </div>
                            <div className="form-item">
                                <label>image</label>
                                <input type="file" accept="image/*" name="image" onChange={this.uploadImage} style={hideStyle} />
                                <button onClick={this.openUploadImagePopup}>upload</button>
                                {
                                    this.state.detail.image && <img src={detail.image} width="300"></img>
                                }
                            </div>
                            <button onClick={this.save}>save</button>
                        </form>
                        :
                        <div className="art-list-wrap">
                            <div>{artHtmlList[0]}</div>
                            <div>{artHtmlList[1]}</div>
                            <div>{artHtmlList[2]}</div>
                            {
                                detailMode && <div className="art-detail-wrap" onClick={this.closeDetail}>
                                    <div className="art-detail-conts">
                                        <img className={detailMode && "on"} src={this.state.detail.image}></img>
                                    </div>
                                </div>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default Gallery;
