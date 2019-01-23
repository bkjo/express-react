import React, { Component } from 'react';
import {connect} from 'react-redux';

import { selectBook } from '../reduxStore/action';
import {Api} from '../services/util';
import Modal from '../components/modal';
import BookList from './book/bookList';
import BookAdd from './book/bookAdd';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookList: [],
      bookId: '',
      bookName: '',
      bookAuthor: '',
      addFlag: false,
      modalFlag: false,
      toggleText: '추가'
    };
  }

  componentDidMount = () => {
    this._serviceBookList();
  }

  _serviceBookList = async () =>{
    const res = await Api.bookList();
    let bookList = res.data || [];
    if(!(bookList instanceof Array)) bookList = [bookList];
    this.setState({
      bookList
    })
  };

  _toggleBook = () => {
    this.setState(prev => {
      const addFlag = !prev.addFlag;
      const toggleText = addFlag ? '닫기' : '추가';
      return {
        addFlag,
        toggleText
      }
    })
  }

  _changeBookName = (e) => {
    this.setState({
      bookName: e.target.value
    })
  }
  _changeBookAuthor = (e) => {
    this.setState({
      bookAuthor: e.target.value
    })
  }
  _addBook = async () => {
    const {bookName, bookAuthor} = this.state;
    
    await Api.bookAdd(bookName, bookAuthor);
    await this.setState({
      addFlag: false,
      toggleText: '추가',
      bookName: '',
      bookAuthor: ''
    });
    await this._serviceBookList();
  }

  // 모달창 띄우고 id값 store 저장
  _findOne = (id) => {
    const {selectBook } = this.props; // action 함수 props 받음
    selectBook(id); // redux 함수호출
    this.setState({
      modalFlag: true
    })
  }
  
  // 모달창 닫기
  _closeModal = () => {
    this.setState({
      modalFlag: false
    },()=>{
      this._serviceBookList();
    })
  }
 
  // 선택된 리스트 제거
  _onDel = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까??")) {    //확인
      await Api.bookDelete(id);
      await this._serviceBookList();
    } else {   //취소
        return;
    }
  }

  render() {
    const {
      addFlag, 
      modalFlag,
      toggleText,
      bookList, 
      bookName,
      bookAuthor,
    } = this.state;
    
    return (
      <div className="App">
        <div className="inputbook">
          <button onClick={this._toggleBook}>{toggleText}</button>
        </div>
        {addFlag &&
          <BookAdd 
            _changeBookName={this._changeBookName}
            _changeBookAuthor={this._changeBookAuthor}
            _addBook={this._addBook}
            bookName={bookName}
            bookAuthor={bookAuthor}
          />
        }

        <a href="http://localhost:8080/bookList">이동</a><br/>
        <div className="booklist">

          <div className="bookcolumn book-title">
                  <div className="book-value">제목</div>
                  <div className="book-value">저자</div>
                  <div className="book-value">비고</div>
          </div>
          <div className="bookline"> </div>
            {bookList.length > 0 ? bookList.map((data, index) => {
              return <BookList data={data} key={index} _findOne={this._findOne} _onDel={this._onDel} />
            }) : null}
        </div>
          {modalFlag && <Modal _closeModal={this._closeModal} headerTitle="수정" /> }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedBook: state.selectedBook,
  }
};

const mapDispatcherToProps = (dispatch) => {
  return {
    selectBook: (selectedBook) => dispatch(selectBook(selectedBook))
  }
};

App = connect(mapStateToProps, mapDispatcherToProps)(App);

export default App;
