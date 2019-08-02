var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

const router = require('./routes/route.js');

//adding middleware - cors
app.use(cors());

//body - parser
app.use(bodyParser.json());

//connect to mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contactlists'
});

connection.connect((err)=>{
    if (err) throw err;
    console.log("Connected to mysql database");
  });

//routes
app.use('/api', router);

//testing server
app.get('/', (req, res)=> res.send('foobar'));

// port
const port = 8080;

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, ()=> console.log('server started at port:' + port));