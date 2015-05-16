//Call the Packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.Port || 8080;
var path = require('path');
var User = require('./app/models/user')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

//Connect to the Database
mongoose.connect('mongodb://localhost:27017/hello-bike');


//Set the Routes
app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

var apiRouter = express.Router();
var adminRouter = express.Router();

apiRouter.use(function(req, res, next){
  console.log('someone just came to the API!');
  //user authentication happens in this middleware
  next();
});

apiRouter.get('/', function(req, res){
  res.json({message:'Welcome to the api.'});
});

apiRouter.route('/users')
  .post(function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err){
      if(err){
        if(err.code == 11000){
          return res.json({success: false, message: 'A user with that username already exists.'});
        }else{
          return res.send(err);
        }
      }
      res.json({message: 'user created!'});
    });
  });

adminRouter.get('/', function(req, res){
  res.send('I am the admin dashboard');
});

adminRouter.get('/users', function(req, res){
  res.send('I show all the users');
});

adminRouter.get('/users/:name', function(req, res){
  res.send('Hello '+req.params.name +'!');
});

adminRouter.get('/posts', function(req, res){
  res.send('I show all the posts');
});

//Register Routes
app.use('/api', apiRouter);
app.use('/admin', adminRouter);



app.listen(port);
console.log('App running on port' + port);
