import React from 'react';
import * as firebase from 'firebase';
import moment from 'moment';

import Article from './Article';

class GuestBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: {},
            detail: {},
            editMode: false,
        };

        this.database = firebase.database();

        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.save = this.save.bind(this);
        this.changeDetail = this.changeDetail.bind(this);
    }

    componentWillMount() {
        this.database.ref('article').on('value', (articles) => {
            let articleMap = {};

            articles.forEach((article) => {
                const articleVal = article.val();

                articleMap[article.key] = {
                    key: article.key,
                    title: articleVal.title,
                    name: articleVal.name,
                    desc: articleVal.desc,
                    date: articleVal.date,
                };
            });

            this.setState({
                articles: articleMap,
            });
        });
    }

    componentWillUnmount() {
        this.database.ref('article').off('value');
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
            detail: Object.assign({}, this.state.articles[key]),
        });
    }

    delete(e) {
        let key = e.currentTarget.getAttribute('data-key');

        this.database.ref('article/' + key).remove()
            .then(() => {
                alert('삭제 성공');
            })
            .catch(() => {
                alert('삭제 실패');
            });
    }

    save(e) {
        e.preventDefault();

        let detail = Object.assign({date: moment().format('YYYY/MM/DD')}, this.state.detail);

        if (detail.key) {
            // 수정
            this.database.ref('article/' + detail.key).set(detail)
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
            detail.key = this.state.detail.title + '-' + moment().format('YYYYMMDDhhmmss');

            let articles = Object.assign({[detail.key]: detail}, this.state.articles);

            this.database.ref('article').set(articles)
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

    changeDetail(e) {
        this.setState({
            detail: Object.assign({}, this.state.detail, {[e.target.name]: e.target.value}),
        });
    }

    render() {
        const {detail, editMode, articles} = this.state;

        let articleHtmlList = [];

        for (let key in articles) {
            if (articles.hasOwnProperty(key)) {
                let article = articles[key];
                articleHtmlList.push(<Article article={article} editFn={this.edit} deleteFn={this.delete}/>);
            }
        }

        return (
            <div className="guest-book-wrap">
                {!editMode && <button className="btn" onClick={this.add}>+</button>}
                {
                    editMode ?
                        <form>
                            <div className="form-item">
                                <label>title</label>
                                <input name="title" value={detail.title} onChange={this.changeDetail}/>
                            </div>
                            <div className="form-item">
                                <label>name</label>
                                <input name="name" value={detail.name} onChange={this.changeDetail}/>
                            </div>
                            <div className="form-item">
                                <label>desc</label>
                                <input name="desc" value={detail.desc} onChange={this.changeDetail}/>
                            </div>
                            <button onClick={this.save}>save</button>
                        </form>
                        :
                        <div>
                            {articleHtmlList}
                        </div>
                }
            </div>
        );
    }
}

export default GuestBook;
