import React, { Component } from 'react';
import {Api} from '../services/util';

import BookList from './book/bookList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookList: []
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
  render() {
    const {bookList} = this.state;
    return (
      <div className="App">
        <a href="http://localhost:8080/bookList">이동</a><br/>
        {bookList.length > 0 ? bookList.map((data, index) => {
           return <BookList data={data} key={index}></BookList>
        }) : null}
      </div>
    );
  }
}

export default App;
