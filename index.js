const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {createPool}=require('mysql');
const pool = createPool({
    host: 'localhost',
    // port: '3306',
    user: 'root',
    password: '',
    database: 'details',
    connectionLimit: 10
});


app.use(bodyParser.urlencoded({extendend: true}));
app.set('view engine', 'ejs');
app.use(express.static("stylesheets"));

var sessionstorage = require('sessionstorage');
var sessionstoragelist = [];

// current date and time
let date_time = new Date();
let date = ("0" + date_time.getDate()).slice(-2);
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year = date_time.getFullYear();

// going to student dash from about us page
app.get('/stuDash',function(req,res){
    res.render('/stu_dash',{username: sessionstorage.getItem('username')});
});

//from login page
app.post('/Dashboard',function(req,res){
    console.log(req.body);
    req.body.username = req.body.username.toLowerCase();
    console.log(req.body.username);
    sessionstorage.setItem('username',req.body.username);
    pool.query('SELECT * FROM newlogin where username=? and password=?',[req.body.username,req.body.password],(err,result,feilds)=>{
		if(err){
			console.log(err);
		}
        else if (result.length==0){
            res.redirect('/login_alert');
        }
		else if(result[0]['role']=='teacher'){
            req.body.username=req.body.username.split("@")[0];
			res.render('teacher_dash',{username: sessionstorage.getItem('username'),eventdeatils: sessionstoragelist, isAdded: false});
		}
        else if (result[0]['role']=='student'){
            res.render('stu_dash',{username: sessionstorage.getItem('username'),eventdeatils: sessionstoragelist});
        }
	})
});

app.get('/teacher_dash',function(req,res){
    console.log(sessionstoragelist);
    res.render('teacher_dash',{username: sessionstorage.getItem('username'), eventdeatils: sessionstoragelist, isAdded: false});
});

app.get('/teacher_dash1',function(req,res){
    console.log(sessionstoragelist);
    res.render('teacher_dash',{username: sessionstorage.getItem('username'), eventdeatils: sessionstoragelist, isAdded: true});
});

app.get('/about',function(req,res){
    console.log(req.url);
    res.render('about',{username: sessionstorage.getItem('username'), isLogged: true});
});

//logged out version of about us page
app.get('/about1',function(req,res){
    console.log(req.url);
    res.render('about',{username: sessionstorage.getItem('username'), isLogged: false});
});

//for alert and submitted form data in event creation
app.post('/added_event',function(req,res){
    console.log(req.body);
    // var cuurent_data = today.tolocaleDateString("en-US   ",options);
    sessionstoragelist.push(req.body);
    res.redirect('/teacher_dash1');  
});

app.get('/',function(req,res){
    res.render('login',{isAlert: false});
});

app.get('/home',function(req,res){
    pool.query('SELECT * FROM newlogin where username=?',[sessionstorage.getItem('username')],(err,result,feilds)=>{
		if(err){
			console.log(err);
		}
        else if (result[0]['role']=='teacher'){
            res.render('teacher_dash',{username: sessionstorage.getItem('username'), eventdeatils: sessionstoragelist, isAdded: false});
        }
        else{
            res.render('stu_dash',{username: sessionstorage.getItem('username'),eventdeatils: sessionstoragelist});
        }
	})
});
//opening the login_alert page
app.get('/login_alert',function(req,res){
    res.render('login',{isAlert: true});
});

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});