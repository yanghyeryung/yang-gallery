import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);

        //this.add = this.add.bind(this);
    }


    render() {
        return (
            <div className="list-view">
                <button onClick={this.login}>+</button>
                <ul>
                    List
                </ul>
            </div>
        );
    }
}

export default List;
