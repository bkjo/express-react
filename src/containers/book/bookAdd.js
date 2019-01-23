import React, { Component } from 'react';

class BookAdd extends Component {
    render() {
        const {
            _changeBookName,
            _changeBookAuthor,
            _addBook,
            bookName,
            bookAuthor
        } = this.props;
        return (
            <div className="addbook">
                <div className="input-container">
                    <div className="caption">
                        <span>책</span>
                    </div>
                    <div className="value">
                        <input type="text" value={bookName} onChange={_changeBookName}/> 
                    </div>
                    </div>
                    <div className="input-container">
                    <div className="caption">
                        <span>저자</span>
                    </div>
                    <div className="value">
                        <input type="text" value={bookAuthor} onChange={_changeBookAuthor} />
                    </div>
                </div>
                <button className="addbtn" onClick={_addBook}> 저장 </button>
          </div>
        );
    }
}

export default BookAdd;