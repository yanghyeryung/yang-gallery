import React from 'react';
import * as firebase from 'firebase';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            arts: [],
        };

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }


    componentDidMount() {
        const database = firebase.database();

        database.ref('art').once('value').then((arts) => {
            const artsList = [];
            arts.forEach((art) => {
                const artVal = art.val();
                artsList.push({
                    title: artVal.title,
                    image: artVal.image,
                    content: artVal.content,
                    date: artVal.date,
                });
            });

            this.setState({
                arts: artsList,
            });
        });
    }

    add() {

    }

    delete() {

    }

    render() {
        return (
            <div className="list-view">
                <button onClick={this.add}>+</button>
                <ul>
                    {
                        this.state.arts.map((art) => {
                            return (<li>
                                <div className="title">{art.title}</div>
                                <div className="image">{art.image}</div>
                                <div className="content">{art.content}</div>
                                <div className="date">{art.date}</div>
                                <button onClick={this.delete}>x</button>
                            </li>);
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default List;
