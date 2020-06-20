//NodeJS Project RunPort
const nodeport=8888;

//Used for ENV
const dotenv = require('dotenv').config();

//MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:AdB83cD6MQuRI1hV@saurabh-qlqmv.mongodb.net/database_wq?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, db) {
   if (err) throw err; 
   console.log('Successfully connected live mongodb');
});

//Modules
var http = require('http');
var express=require('express');
var app=express();
const router = express.Router();

// Other Modules
const bodyParser = require('body-parser');
const cors = require('cors');
const engines = require('consolidate');
/*bodyParser*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors());
const jsonParser = bodyParser.json();

app.use(express.static(__dirname + "/public/"));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('view', __dirname + '/public/');
app.get('/', function(req, res) {
  res.sendFile(__dirname + "/" + "index.html");
});

//Route File Include In NodeJS
var routeConfig = require('./public/mvc_code/route/routeAppConfig');
app.use(routeConfig)

//Allow Cross Origion
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Listen NodeJS Port
app.listen(nodeport,()=>{console.log(`Listening to ${nodeport}`); })