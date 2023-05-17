const express = require('express');
const app = express();
const bodyParser = require('body-parser');
 
var sessionstorage = require('sessionstorage');
// var path = require('path');
app.use(bodyParser.urlencoded({extendend: true}));



app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname+'stylesheet')));

//linking style sheets in stylesheets directory 
app.use(express.static("stylesheets"));


// app.get('/header',function)
app.get('/about',function(req,res){
    console.log(req.url);
    res.render('about',{username: sessionstorage.getItem('username')});
});

app.get('/stuDash',function(req,res){
    res.render('teacher_dash',{username: sessionstorage.getItem('username')});
});

app.post('/stuDash',function(req,res){
    console.log(req.body);
    // console.log(req.body.username);
    sessionstorage.setItem('username',req.body.username);
    res.render('teacher_dash',{username: sessionstorage.getItem('username')});
});

app.post('/added_event',function(req,res){
    console.log(req.body);
});

app.get('/',function(req,res){
    res.render('login');
})
app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});



