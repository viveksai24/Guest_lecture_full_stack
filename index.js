const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// var path = require('path');
app.use(bodyParser.urlencoded({extendend: true}));



app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname+'stylesheet')));

var globalUsername = '';
// app.get('/header',function)
app.get('/about',function(req,res){
    console.log(req.body);
    res.render('about',{username: globalUsername});
});

app.get('/stuDash',function(req,res){
    res.render('stu_dash',{username: globalUsername});
});

app.post('/stuDash',function(req,res){
    console.log(req.body);
    // console.log(req.body.username);
    globalUsername = req.body.username;
    res.render('stu_dash',{username: globalUsername});
});

app.get('/',function(req,res){
    res.render('login');
})
app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});



