import React, { Component } from 'react';

class BookList extends Component {
    _onDel = (e) => {
        e.stopPropagation();
        this.props._onDel(this.props.data._id);
    }
    render() {
        const {
            data,
            _findOne
        } = this.props;
        return (
            <div className="bookcolumn book-content" onClick={(e) => _findOne(data._id)}>
                <div className="book-value">{data.title}</div>
                <div className="book-value">{data.author}</div>
                <button className="book-value" onClick={this._onDel}>삭제</button>
            </div>
        );
    }
}

export default BookList;