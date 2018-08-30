const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect("mongodb://test:test123@ds229312.mlab.com:29312/graphql")
    .then(()=>{
        console.log("몽구스 연결 성공");
    })
    .catch((err)=>{
        console.log("err : ", err);
    })

const Book = mongoose.model("book", {title:String, author:String})

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// cross 도메인 에러 처리
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  

app.get('/bookList', function (req, res) {
    Book.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(books);
    })

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);