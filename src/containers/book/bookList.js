import React, { Component } from 'react';

class BookList extends Component {
    render() {
        const {data} = this.props;
        return (
            <div className="bookList">
                <span>Title: {data.title}</span>
                <span>Author: {data.author}</span>
            </div>
        );
    }
}

export default BookList;