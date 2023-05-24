const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extendend: true}));
app.set('view engine', 'ejs');
app.use(express.static("stylesheets"));

var sessionstorage = require('sessionstorage');
var sessionstoragelist = ["AI","Computer networks"];

// current date and time
let date_time = new Date();
let date = ("0" + date_time.getDate()).slice(-2);
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year = date_time.getFullYear();

// going to student dash from about us page
app.get('/stuDash',function(req,res){
    res.render('teacher_dash_alert',{username: sessionstorage.getItem('username'),eventdeatils: sessionstoragelist});
});

app.post('/stuDash',function(req,res){
    console.log(req.body);
    sessionstorage.setItem('username',req.body.username);
    res.render('teacher_dash_alert',{username: sessionstorage.getItem('username'),eventdeatils: sessionstoragelist});
});

app.get('/teacher_dash',function(req,res){
    console.log(sessionstoragelist);
    res.render('teacher_dash_alert',{username: sessionstorage.getItem('username'), eventdeatils: sessionstoragelist});
});

app.get('/about',function(req,res){
    console.log(req.url);
    res.render('about',{username: sessionstorage.getItem('username')});
});

app.post('/added_event',function(req,res){
    console.log(req.body);
    // var cuurent_data = today.tolocaleDateString("en-US   ",options);
    sessionstoragelist.push(req.body.event);
    res.redirect('/teacher_dash');  
});

app.get('/',function(req,res){
    res.render('login');
});

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});