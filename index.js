const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {createPool}=require('mysql');
const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'guest_lecture',
    connectionLimit: 10
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }


app.use(bodyParser.urlencoded({extendend: true}));
app.set('view engine', 'ejs');
app.use(express.static("stylesheets"));

var sessionstorage = require('sessionstorage');
const { fileLoader } = require('ejs');
// var sessionstoragelist = [];

// current date and time
let date_time = new Date();
let date = ("0" + date_time.getDate()).slice(-2);
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
let year = date_time.getFullYear();

function requireLogin(req, res, next) {
    if (sessionstorage.length == 0) {
      return res.redirect('/');
    }
    next();
}

// going to student dash from about us page
app.get('/stuDash',async(req,res)=>{
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    var dept = sessionstorage.getItem('dept');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });
                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }

    for(var i = 0; i<final.length;i++){
        if(final[i]['reg_users'].includes(username)){
            final[i]['isRegistered'] = true;
        }else{
            final[i]['isRegistered'] = false;
        }
    }
    res.render('stu_dash',{username: username, name: name,role:role, eventdetails: final ,currentdate:now,registerAlert: false,feedbackAlert: false,user_dept:dept});
});

//this method is for alert box which says registered successfully in student dash.
app.get('/stuDash1',async(req,res)=>{
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    var dept = sessionstorage.getItem('dept');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });
                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }

    for(var i = 0; i<final.length;i++){
        if(final[i]['reg_users'].includes(username)){
            final[i]['isRegistered'] = true;
        }else{
            final[i]['isRegistered'] = false;
        }
    }
    res.render('stu_dash',{username: username, name: name,role:role, eventdetails: final ,currentdate:now,registerAlert: true,feedbackAlert: false,user_dept:dept});
});

//for feedback noted successfully student dash
app.get('/stuDash2',async(req,res)=>{
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    var dept = sessionstorage.getItem('dept');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });
                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }

    for(var i = 0; i<final.length;i++){
        if(final[i]['reg_users'].includes(username)){
            final[i]['isRegistered'] = true;
        }else{
            final[i]['isRegistered'] = false;
        }
    }
    res.render('stu_dash',{username: username, name: name,role:role, eventdetails: final ,currentdate:now,registerAlert: false,feedbackAlert: true,user_dept:dept});
});

app.get('/Dashboard', async (req,res) => {
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    var dept = sessionstorage.getItem('dept');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });
                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }
    if(role == 'teacher'){   
        res.render('teacher_dash',{username: username, name: name,role:role, eventdetails: final, isAdded: false,currentdate:now,user_dept:dept});
    }
    else if (role == 'student'){
        for(var i = 0; i<final.length;i++){
            if(final[i]['reg_users'].includes(username)){
                final[i]['isRegistered'] = true;
            }else{
                final[i]['isRegistered'] = false;
            }
        }
        res.render('stu_dash',{username: username, name: name,role:role, eventdetails: final ,currentdate:now,registerAlert: false,feedbackAlert: false,user_dept:dept});
    }else if(role=='admin'){
        res.render('admin_dash',{username: username, name: name,role:role, eventdetails: final ,currentdate:now, isAdded: false,isUpdated:false});
    }
});

//from login page
app.post('/Dashboard',function(req,res){
    req.body.username = req.body.username.toLowerCase();
    sessionstorage.setItem('username',req.body.username);
    pool.query('SELECT * FROM login where Username=? and Password=?',[req.body.username,req.body.password],(err,result,feilds)=>{
		if(err){
			console.log(err);
		}
        else if (result.length==0){
            res.redirect('/login_alert');
        }else{
            sessionstorage.setItem('name',result[0]['Name']);
            sessionstorage.setItem('role',result[0]['Role']);
            sessionstorage.setItem('dept',result[0]['Dept']);
            res.redirect('/Dashboard');
        }
	})
});

app.get('/teacher_dash',async(req,res)=>{
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    var dept = sessionstorage.getItem('dept');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }
    res.render('teacher_dash',{username: username, name: name,role:role, eventdetails: final, isAdded: false,currentdate:now,user_dept:dept});
});

app.get('/admin_dash',async(req,res)=>{
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }
    res.render('admin_dash',{username:username,isUpdated: false,name:name,role:role, eventdetails:final, isAdded: false,currentdate:now});
});

app.get('/admin_dash1',async(req,res)=>{
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });
                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }
    
    res.render('admin_dash',{username:username,name:name,role:role, eventdetails:final, isAdded: true,currentdate:now, isUpdated: false});
});

//for alert in updated form data in event creation in the admin dashboard.

app.get('/admin_dash2',async(req,res)=>{
    var name = sessionstorage.getItem('name');
    var username = sessionstorage.getItem('username');
    var role = sessionstorage.getItem('role');
    const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    var final = [];
    var depts;
    var boo = true;
    pool.query('SELECT * FROM event_details;',async (err,result1)=>{
        if(err){
            console.log(err);
        }else{
            for (var i=0; i<result1.length;i++){
                var depts = [];
                var booo = true;
                pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        for (var j=0; j<result2.length;j++){
                            depts.push(result2[j]['dept']);
                        }
                    }
                    booo = false;
                });
                while(booo) await sleep(10);
                final.push({
                    EventID: result1[i]['EventID'],
                    faculty : result1[i].faculty,
                    Event_name: result1[i].Event_name,
                    descp: result1[i].descp,
                    guestname: result1[i].guestname,
                    linkedIN: result1[i].linkedIN,
                    guestmail: result1[i].guestmail,
                    guestnum: result1[i].guestnum,
                    mode: result1[i].mode,
                    platform: result1[i].platform,
                    sdt: result1[i].sdt,
                    edt: result1[i].edt,
                    dept:depts,
                    join: result1[i].join_link
                });
                
            }
        }
        boo = false;
    });
    while(boo) await sleep(10);
    for(var i = 0; i<final.length;i++){
        var boo = true;
        pool.query('SELECT * FROM register where register.EventID=?;',[final[i]['EventID']],async (err,result,feilds)=>{
            var reg_users=[]
            if(err){
                console.log(err);
            }else{
                for(var j=0;j<result.length;j++){
                    reg_users.push(result[j]['username']);
                }
                final[i]['reg_users'] = reg_users;
            }
            boo = false;
        });
        while(boo) await sleep(10);
    }
    
    res.render('admin_dash',{username:username,name:name,role:role, eventdetails:final, isAdded: false,currentdate:now, isUpdated: true});
});

app.get('/about',function(req,res){
    console.log(req.url);
    res.render('about',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'), isLogged: true});
});

//logged out version of about us page
app.get('/about1',function(req,res){
    console.log(req.url);
    res.render('about',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'), isLogged: false});
});

//for alert and submitted form data in event creation
app.post('/added_event',function(req,res){
    // var cuurent_data = today.tolocaleDateString("en-US   ",options);
    // const startDateTime = new Date(req.body.dateTime[0]);
    // const endDateTime = new Date(req.body.dateTime[1]);    
	pool.query('INSERT INTO event_details SET ?', {faculty: req.body.faculty,Event_name:req.body.event,descp:req.body.eDescription, guestname:req.body.gName,linkedIN:'hello',guestmail:req.body.gMail,guestnum:req.body.gPhone,mode:req.body.inlineRadioOptions,platform:req.body.platform,sdt:req.body.dateTime[0],edt:req.body.dateTime[1]}, (err,result,feilds) => {
        if(err){
            console.log(err)
        }else{
            var eventid = result.insertId;
            
               if(Array.isArray(req.body.department)){
                    for (var i=0; i<req.body.department.length;i++){
                        pool.query('INSERT INTO event_dep SET ?', {EventID: eventid,dept:req.body.department[i]}, (err,result,feilds) => {
                            if (err){
                                console.log(err);
                            }else{
                                console.log('added event');
                            }
                        });
                    }                
                }else{
                    pool.query('INSERT INTO event_dep SET ?', {EventID: eventid,dept:req.body.department}, (err,result,feilds) => {
                        if (err){
                            console.log(err);
                        }else{
                            console.log('added event');
                        }
                    });
                }    
            
        }
    });

    // sessionstoragelist.push(req.body);
    res.redirect('/admin_dash1');  
});

app.post('/register',function(req,res){
    var eventid = req.body.event_id;
    var username = sessionstorage.getItem('username');
    pool.query('INSERT INTO register SET ?', {EventID: eventid,username:username}, (err,result,feilds) => {
        if (err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
    res.redirect('/stuDash1');
});

//feedback 
app.post('/feedback',function(req,res){
    var eventid = req.body.event_id;
    var username = sessionstorage.getItem('username');
    pool.query('INSERT INTO feedback SET ?', {EventID: eventid,username:username,options:req.body.radio_option,comments:req.body.comments}, (err,result,feilds) => {
        if (err){
            console.log(err);
        }else{
            console.log('feedback done');
        }
    });
    res.redirect('/stuDash2');
});

//update function in admin dash
app.post('/update_event',function(req,res){
    console.log(req.body);
    var eventid = req.body.event_id;
    if (req.body.inlineRadioOptions == 'option1'){
        pool.query('UPDATE event_details SET faculty=?,Event_name=?,descp=?,guestname=?,linkedIN=?,guestmail=?,guestnum=?,mode=?,platform=?,sdt=?,edt=?,join_link=? where EventID=?',[req.body.faculty,req.body.event,req.body.eDescription,req.body.gName,'hello',req.body.gMail,req.body.gPhone,req.body.inlineRadioOptions,req.body.platform,req.body.dateTime[0],req.body.dateTime[1],req.body.link,eventid],(err,result,feilds)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result);
                pool.query('DELETE FROM event_dep where EventID=?',[eventid],(err,result,feilds)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('deleted');
                    }
                });
                if(Array.isArray(req.body.department)){
                    for (var i=0; i<req.body.department.length;i++){
                        pool.query('INSERT INTO event_dep SET ?', {EventID: eventid,dept:req.body.department[i]}, (err,result,feilds) => {
                            if (err){
                                console.log(err);
                            }else{
                                console.log('updated');
                            }
                        });
                    }                
                }else{
                    pool.query('INSERT INTO event_dep SET ?', {EventID: eventid,dept:req.body.department}, (err,result,feilds) => {
                        if (err){
                            console.log(err);
                        }else{
                            console.log('updated');
                        }
                    });
                } 
            }
        })
}else{
    pool.query('UPDATE event_details SET faculty=?,Event_name=?,descp=?,guestname=?,linkedIN=?,guestmail=?,guestnum=?,mode=?,platform=?,sdt=?,edt=? where EventID=?',[req.body.faculty,req.body.event,req.body.eDescription,req.body.gName,'hello',req.body.gMail,req.body.gPhone,req.body.inlineRadioOptions,req.body.platform,req.body.dateTime[0],req.body.dateTime[1],eventid],(err,result,feilds)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            pool.query('DELETE FROM event_dep where EventID=?',[eventid],(err,result,feilds)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('deleted');
                }
            });
            if(Array.isArray(req.body.department)){
                for (var i=0; i<req.body.department.length;i++){
                    pool.query('INSERT INTO event_dep SET ?', {EventID: eventid,dept:req.body.department[i]}, (err,result,feilds) => {
                        if (err){
                            console.log(err);
                        }else{
                            console.log('updated');
                        }
                    });
                }                
            }else{
                pool.query('INSERT INTO event_dep SET ?', {EventID: eventid,dept:req.body.department}, (err,result,feilds) => {
                    if (err){
                        console.log(err);
                    }else{
                        console.log('updated');
                    }
                });
            } 
        }
    })
}
    res.redirect('/admin_dash2');
});

app.get('/',function(req,res){
    res.render('login',{isAlert: false});
});

app.get('/home',function(req,res){
    pool.query('SELECT * FROM login where Username=?',[sessionstorage.getItem('username')],(err,result,feilds)=>{
		if(err){
			console.log(err);
		}
        else if (result[0]['Role']=='teacher'){
            res.redirect('/teacher_dash');
        }
        else if(result[0]['Role']=='student'){
            res.redirect('/stuDash');
        }else{
            res.redirect('/admin_dash');
        }
	})
});

app.post('/view_feedback',async(req,res)=>{
    var eventid = req.body.eventid;
    var event_name = req.body.event_name;
    var username = sessionstorage.getItem('username');
    var name = sessionstorage.getItem('name');
    var final=[];
    var total;
    var option1=0,option2=0,option3=0,option4=0,option5=0;
    var bool = true;
    pool.query('SELECT * FROM feedback where EventID=?',[eventid],(err,result,feilds)=>{
        if(err){
            console.log(err);
        }else{
            total = result.length;
            for(var i=0;i<total;i++){
                if(result[i]['options']=='option1'){
                    option1++;
                }else if(result[i]['options']=='option2'){
                    option2++;
                }else if(result[i]['options']=='option3'){
                    option3++;
                }else if(result[i]['options']=='option4'){
                    option4++;
                }else{
                    option5++;
                }
                final.push(result[i]);
            }

            console.log('feedback retrieved');
        }
        bool = false;
    });
    while(bool) await sleep(10);
    res.render('view_feedback',{option1:option1,option2:option2,option3:option3,option4:option4,option5:option5,total:total,name:name,final:final,event_name:event_name});
});

app.get('/chat_box',async(req,res)=>{
    var eventid = sessionstorage.getItem('session_eventid');
    var event_name = sessionstorage.getItem('session_event_name');
    var username = sessionstorage.getItem('username');
    var name = sessionstorage.getItem('name');
    var final=[];
    var bool = true;
    pool.query('SELECT * FROM messages where EventID=?',[eventid],(err,result,feilds)=>{
        if(err){
            console.log(err);
        }else{
            
            console.log('messages retrieved');
            final=result;
        }
        bool = false;

    });
    while(bool) await sleep(10);
    res.render('chat',{eventid:eventid,event_name:event_name,username:username,name:name,final:final});
});

app.post('/post_chats',async(req,res)=>{
    var username = sessionstorage.getItem('username');
    var name = sessionstorage.getItem('name');
    var eventid = sessionstorage.getItem('session_eventid');
    var event_name = sessionstorage.getItem('session_event_name');
    var message = req.body.message;
    var now = new Date();
    var boo = true;
    pool.query('INSERT INTO messages SET ?', {EventID: eventid,message:message,username:username,name:name,timestamp:now}, (err,result,feilds) => {
        if (err){
            console.log(err);
        }else{
            console.log('message saved');
        }
        boo = false;
    });
    while(boo) await sleep(10);
    res.redirect('/chat_box');
});

app.post('/chat_box',async(req,res)=>{
    sessionstorage.setItem('session_eventid',req.body.eventid);
    sessionstorage.setItem('session_event_name',req.body.event_name);
    res.redirect('/chat_box');
});
//opening the login_alert page
app.get('/login_alert',function(req,res){
    res.render('login',{isAlert: true});
});

app.get('/logout',requireLogin ,function(req,res){
    sessionstorage.clear();
    res.redirect('/');
});

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});


