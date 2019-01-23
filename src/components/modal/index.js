import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import {Api} from '../../services/util';

class Modal extends Component {
    constructor(props){
        super(props);
        this.state={
            author: '',
            title: ''
        };
        
    }
    componentDidMount(){
        this._selectBook();
    }

    _selectBook = async () => {
        const {selectedBook} = this.props; // store (state.selectedBook) 값
        const res = await Api.bookSelect(selectedBook);
        const author = res.data.author;
        const title = res.data.title;
        this.setState({
            author,
            title
        })
    }
    _handleTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    _handleAuthor = (e) => {
        this.setState({
            author: e.target.value
        })
    }

    _onSubmit = async () => {
        const {title, author} = this.state;
        const {selectedBook, _closeModal} = this.props;
        await Api.bookUpdate(selectedBook, title, author);
        await _closeModal();
    }

    // _onDel = async () => {
    //     const {selectedBook, _closeModal} = this.props;
        // if (window.confirm("정말 삭제하시겠습니까??")) {    //확인
            // await Api.bookDelete(selectedBook);
        // } else {   //취소
            // return;
        // }
    //     await _closeModal();
    // }

    render() {
        const {
            title,
            author
        } = this.state;
        const {
            _closeModal,
            headerTitle
        } = this.props;
        return ReactDOM.createPortal (
        <div id="modal-wrap">
                <div className="book modal-container">
                    <div className="modal-header">
                        {headerTitle}
                        <span className="modal-close" onClick={_closeModal}>X</span>
                    </div>
                    <div className="modal-body">
                        <div className="content-container">
                            <div className="caption">
                                제목
                            </div>
                            <div className="value">
                                <input type="text" value={title} onChange={this._handleTitle} />
                            </div>
                        </div>
                        <div className="content-container">
                            <div className="caption">
                                저자
                            </div>
                            <div className="value">
                                <input type="text" value={author} onChange={this._handleAuthor} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div>
                            <button onClick={this._onSubmit}>저장</button>
                            <button onClick={_closeModal}>취소</button>
                        </div>
                    </div>
                    
            </div>
        </div>
        , document.getElementById("root"));
    }
}

const mapStateToProps = (state) => {
    return {
      selectedBook: state.selectedBook,
    }
  };

Modal = connect(mapStateToProps)(Modal);

export default Modal;