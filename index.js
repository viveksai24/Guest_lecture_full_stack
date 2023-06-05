const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {createPool}=require('mysql');
const pool = createPool({
    host: 'sql12.freesqldatabase.com',
    port: '3306',
    user: 'sql12623427',
    password: 'gc6JWu2GU6',
    database: 'sql12623427',
    connectionLimit: 10
});


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
    pool.query('SELECT * FROM Login where Username=? and Password=?',[req.body.username,req.body.password],(err,result,feilds)=>{
		if(err){
			console.log(err);
		}
        else if (result.length==0){
            res.redirect('/login_alert');
        }
		else if(result[0]['Role']=='teacher'){
            req.body.username=req.body.username.split("@")[0];
            const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
            var final = [];
            pool.query('SELECT * FROM Event_Details;',(err,result1,feilds)=>{
                if(err){
                    console.log(err);
                }else{
                    for (var i=0; i<result1.length;i++){
                        // console.log(i);
                        var depts = [];
                        pool.query('SELECT dept FROM event_dep where event_dep.EventID=?;',[result1[i]['EventID']],(err,result2,feilds)=>{
                            if(err){
                                console.log(err);
                            }else{
                                for (var j=0; j<result2.length;j++){
                                    depts.push(result2[j]['dept']);
                                }
                                // console.log(result1);
                                // const data = JSON.parse(JSON.stringify(result1));
                                // const details = JSON.parse(JSON.stringify(result[i]))
                                // console.log(details)
                                // data.forEach(result1 => {
                                //     console.log(result1.dept);
                                //   });
                                
                                console.log(final)

                            }
                        });
                        final.push({
                            EventID: result1[i].EventID,
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
                            dept: depts
                        });
                    }
                    // sessionstoragelist = result;
                    // console.log(final)
                    sessionstorage.setItem('sessionstoragelist',final);
                }
            });
            sessionstorage.setItem('name',result[0]['Name']);
            console.log(final);
			res.render('teacher_dash',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'),eventdeatils:sessionstorage.getItem('sessionstoragelist') , isAdded: false,currentdate:now});
		}
        else if (result[0]['Role']=='student'){
            sessionstorage.setItem('name',result[0]['Name']);
            res.render('stu_dash',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'),eventdeatils: sessionstoragelist});
        }
	})
});

app.get('/teacher_dash',function(req,res){
    // console.log(sessionstoragelist);
    
    res.render('teacher_dash',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'), eventdeatils:sessionstorage.getItem('sessionstoragelist'), isAdded: false});
});

app.get('/teacher_dash1',function(req,res){
    // console.log(sessionstoragelist);
    
    res.render('teacher_dash',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'), eventdeatils:sessionstorage.getItem('sessionstoragelist'), isAdded: true});
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
    console.log(req.body.department);
    console.log(sessionstorage.getItem('name'));

    // var cuurent_data = today.tolocaleDateString("en-US   ",options);
    
    // const startDateTime = new Date(req.body.dateTime[0]);
    // const endDateTime = new Date(req.body.dateTime[1]);    
	pool.query('INSERT INTO Event_Details SET ?', {faculty: sessionstorage.getItem('name'),Event_name:req.body.event,descp:req.body.eDescription, guestname:req.body.gName,linkedIN:'hello',guestmail:req.body.gMail,guestnum:req.body.gPhone,mode:req.body.inlineRadioOptions,platform:req.body.platform,sdt:req.body.dateTime[0],edt:req.body.dateTime[1]}, (err,result,feilds) => {
        if(err){
            console.log(err)
        }else{
            console.log(result);
            var eventid = result.insertId;
            console.log(eventid);
            for (var i=0; i<req.body.dept.length;i++){
                pool.query('INSERT INTO event_dep SET ?', {EventID: eventid,dept:req.body.department[i]}, (err,result,feilds) => {
                    if(err){
                        console.log(err);
                    }
                });
            }
        }
    });

    // sessionstoragelist.push(req.body);
    res.redirect('/teacher_dash1');  
});

app.get('/',function(req,res){
    res.render('login',{isAlert: false});
});

app.get('/home',function(req,res){
    pool.query('SELECT * FROM Login where Username=?',[sessionstorage.getItem('username')],(err,result,feilds)=>{
		if(err){
			console.log(err);
		}
        else if (result[0]['role']=='teacher'){
            res.render('teacher_dash',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'), eventdeatils: sessionstoragelist, isAdded: false});
        }
        else{
            res.render('stu_dash',{username: sessionstorage.getItem('username'),name: sessionstorage.getItem('name'),eventdeatils: sessionstoragelist});
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