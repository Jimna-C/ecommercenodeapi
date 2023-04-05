var express = require('express');
var app = express();
const fs = require("fs");
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));
var productss = require('./products.json');
// default route
app.get('/', function (req, res) {
return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "Kapture@123",
  database: "admin"
// host: 'b6eldfcrtzjwuelncfqo-mysql.services.clever-cloud.com',
// user: 'utzntugrfx3xefln',
// password: 'UIVy9MHFxchHkvI18VAb',
// database: 'b6eldfcrtzjwuelncfqo'
});
// connect to database
dbConn.connect(); 
// Retrieve all users 
// app.get('/users', function (req, res) {
// dbConn.query('SELECT * FROM users', function (error, results, fields) {
// if (error) throw error;
// return res.send({ error: false, data: results, message: 'users list.' });
// });
// });
// Retrieve user with id 
// app.get('/user/:id', function (req, res) {
// let user_id = req.params.id;
// if (!user_id) {
// return res.status(400).send({ error: true, message: 'Please provide user_id' });
// }
// dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
// if (error) throw error;
// return res.send({ error: false, data: results[0], message: 'users list.' });
// });
// });

app.post('/userlogin', function (req, res, next) {
    var email=req.body.email;
    var password=req.body.password;
   
     
   var sql =  'SELECT * FROM users where email="'+email+'" and password="'+password+'"'
 
   dbConn.query(sql, function (error, results, fields) {
   
    // if (error) throw error;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    if(!results.length){
       return res.send({ error: true, data: results, message: 'Incorrect username or password' });  
    }
    else{
        return res.send({ error: false, data: results, message: 'Login successfully.' });
    }
   
});
    });

    
// Add a new user  
// app.post('/users', function (req, res) {
// let user = req.body.user;
// if (!user) {
// return res.status(400).send({ error:true, message: 'Please provide user' });
// }
// dbConn.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
// if (error) throw error;
// return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
// });
// });
//////////////////////////////////////

app.post('/users', function (req, res, next) {
    var email=req.body.email;
    var password=req.body.password;
     
   var sql =  'INSERT INTO `users`(`email`, `password`) VALUES ("'+email+'","'+password+'")'
   dbConn.query(sql, function (error, results, fields) {
   
    if (error) throw error;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
});
    });



    app.get('/get-category', (req, res) => {
        fs.readFile("category.json", 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
          res.send(JSON.parse(data));
        });
      });


      app.get('/get-bestseller', (req, res) => {
        fs.readFile("bestSeller-data.json", 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
          res.send(JSON.parse(data));
        });
      });
 
      app.get('/get-products', (req, res) => {
        fs.readFile("products.json", 'utf8', (err, data) => {
          if (err) {
            throw err;
          }
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
          res.send(JSON.parse(data));
        });
      });



//  Update user with id
// app.put('/user', function (req, res) {
// let user_id = req.body.user_id;
// let user = req.body.user;
// if (!user_id || !user) {
// return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
// }
// dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
// if (error) throw error;
// return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
// });
// });
//  Delete user
// app.delete('/user', function (req, res) {
// let user_id = req.body.user_id;
// if (!user_id) {
// return res.status(400).send({ error: true, message: 'Please provide user_id' });
// }
// dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
// if (error) throw error;
// return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
// });
// }); 

//////////////////////////////
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

//////////////////////////////
// set port
app.listen(3001, function () {
console.log('Node app is running on port 3001');
});
module.exports = app;