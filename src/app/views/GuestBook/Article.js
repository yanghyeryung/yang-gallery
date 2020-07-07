import React from 'react';
import PropTypes from 'prop-types';

class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {article, editFn, deleteFn} = this.props;

        return (
            <div className="art-wrap">
                <div className="title">{article.title}</div>
                <div className="name">{article.name}</div>
                <div className="desc">{article.desc}</div>
                <div className="date">{article.date}</div>
                <button onClick={editFn} data-key={article.key}>edit</button>
                <button onClick={deleteFn} data-key={article.key}>delete</button>
            </div>
        );
    }
}

Article.propTypes = {
    article: PropTypes.shape({
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        desc: PropTypes.string,
        date: PropTypes.string.isRequired,
    }),
    editFn: PropTypes.func.isRequired,
    deleteFn: PropTypes.func.isRequired,
};

export default Article;
