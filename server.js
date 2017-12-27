var express = require('express');
var request = require('request');
var app = express();
require('dotenv').config();
var port = 56789;
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var api_key = process.env.API_KEY;
var db = process.env.DATABASE;
var admin = process.env.ADMIN;
var password = process.env.PASSWORD;
var sequelize = new Sequelize(db, admin, password, {
  host: '127.0.0.1',
  dialect: 'postgres',
  options: {
        native: true,
        ssl: true
    },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

app.use(express.static('public'));
app.use(bodyParser.json());


// This line was not allowing the data so go back to app2.js
// app.use(bodyParser.urlencoded({extended:false}));

var Users = sequelize.define('users', {
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    party: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    State: {
      type: Sequelize.STRING
    },
    district: {
      type: Sequelize.STRING
    },
    i_vote: {
      type: Sequelize.BOOLEAN
    },
    i_fund: {
      type: Sequelize.BOOLEAN
    },
    i_join: {
      type: Sequelize.BOOLEAN
    },
    verified: {
      type: Sequelize.BOOLEAN
    },
    city: {
      type: Sequelize.STRING
    }
  });

var Questions = sequelize.define( 'questions',
    {
        question: {
            type: Sequelize.STRING
        },
        answer: {
            type: Sequelize.STRING
        }
    }
  );

// Create Table
var createUserTable = function() {
  // force: true will drop the table if it already exists
  Users.sync({force: true}).then(function() {
    // Table created
    // console.log("%%%%%%%%%%%%%%");
  });
};

var createQuestionTable = function(){
    // force: true will drop the table if it already exists
    Questions.sync({force: true}).then(function() {
        // Table created
        // console.log("%%%%%%%%%%%%%%");
    });
};

// Use these when creating new tables

// createUserTable();
// createQuestionTable();



/////////////////////////////////////////
//              FULL CRUD              //
/////////////////////////////////////////

//**********CREATE****************

// %%%%%%%%%%% SEED DATA %%%%%%%%%%%
const seedData = {
    first_name : "Todd",
    last_name  : "Gerdy",
    email      : "abc@123.com",
    party      : "n",
    gender     : "m",
    zip        : "22911",
    address    : "2468 Preciate Rd",
    State      : "VA",
    district   : "5",
    i_vote     : true,
    i_fund     : true,
    i_join     : true,
    verified   : true,
    city       : 'Charlottesville'
  };

const questionOne = {
    question: "What is ALTcongress?",
    answer: "An experiment in social civics that will facilitate collaborative solutions to Americas greatest challenges."
};
const questionTwo = {
    question: "How do you expect to compete with a 225-year-old institution?",
    answer: "By harnessing the very best of the nearly 220 million Americans eligible to vote."
};
const questionThree = {
    question: "What can I do?",
    answer: "We are asking that you voluntarily accept a tax on your time. That you divert a small amount of your TV/internet time to better understand our government and how it works. In return we promise to make it as easy and as engaging as humanly possible."
};
const questionFour = {
    question: "What's wrong with my ideology?",
    answer: "Nothing, so long as you remember that your ideology is a set of beliefs that may differ from others."
};
const questionFive = {
    question: "Is ALTcongress conservative or liberal?",
    answer: "Neither. However, we understand that is almost impossible to believe these days. The most important thing ALTcongress will do as an organization is to objectively facilitate a collaborative process free from any preconceived ideologies."
};
const questionSix = {
    question: "Why should I trust ALTcongress?",
    answer: "We promise that we will be transparent and objective in everything we do. Our goal is to build an organization that enables and empowers all voters to take back their government from special interests."
};
const questionSeven = {
    question: "Why will the current Congress consider our bills?",
    answer: "The ALTcongress website will track the support of each and every proposed bill by congressional district. Additionally, the ALTCONGRESS team will help empower the electorate and bring pressure to bear on our elected officials."
};


// add seed data function
var addUser = function(param1) {
  Users.create(param1);
};
var addQuestions = function(param1) {
    Questions.create(param1);
};

// All of the seed data is created when you go to 'altcongress.org/seed'

//**********READ****************

// Find all Users
var allUsers;
var seeAllUsers = function(res) {
  allUsers = [];
  Users.findAll().then( function(users) {
    for (var i = 0; i < users.length; i++) {
      allUsers.push(users[i].dataValues);
    }
    res.send(allUsers);
    console.log(allUsers);
  });
};

// Find all Questions
this.allQuestions;
var seeAllQuestions = function(res) {
    this.allQuestions = [];
    Questions.findAll().then( function(questions) {
        // console.log(questions);
        for (var i = 0; i < questions.length; i++) {
            this.allQuestions.push(questions[i].dataValues);
        }
        res.send(this.allQuestions);
        // console.log(this.allQuestions);
    });
};


/////////////////////////////////////////
//              Routes             //
/////////////////////////////////////////

// Load main page
app.get('/', function(req,res){
  res.setHeader('Access-Control-Allow-Origin', '*');
    // res.render('index',function(err, html) {
        res.render('index.ejs');
    // });
});

// GET all users
app.get('/users', function(req,res) {
    console.log('connecting');
    // res.send('hello');
  seeAllUsers(res);
  console.log(allUsers);
//   res.send(allUsers);
});

// GET all questions
app.get('/questions', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('finding questions');
    seeAllQuestions(res);
    console.log(allQuestions);
    // res.send(allQusetions);
});


// app.get('/clearQuestions', function(req, res){
//   db.Questions.destroy({
//     where: {},
//     truncate: true
//   });
// });

// GET the district and zipcode when address, city and state are input
app.get('/districts/:addr/:city/:state', function(req, res){
    console.log(req.params.addr, "%%Address");
    console.log(req.params.city, "%%city");
    console.log(req.params.state, '%%state');
    if (!req.params.addr || !req.params.city || !req.params.state){
        res.status(500);
        res.send({
            "Error": "Looks like you are not sending all the needed data."
        });
        console.log("Looks like you are not sending all the needed data.");
    }
    console.log('https://www.googleapis.com/civicinfo/v2/representatives'  + "?address=" + req.params.addr + " " + req.params.city + " " +  req.params.state +'&key='+ api_key);
    request.get({
        url: 'https://www.googleapis.com/civicinfo/v2/representatives'  + "?address=" + req.params.addr + " " + req.params.city + " " +  req.params.state +'&key='+ api_key
        }, function(error, response, body) {
          console.log("It is GETting");
          console.log(response.body);
          if (!error && response.statusCode == 200) {
            var myEscapedJSONString = response.body
                                      .replace(/\\n/g, "\\n")
                                      .replace(/\\'/g, "\\'")
                                      .replace(/\\"/g, '\\"')
                                      .replace(/\\&/g, "\\&")
                                      .replace(/\\r/g, "\\r")
                                      .replace(/\\t/g, "\\t")
                                      .replace(/\\b/g, "\\b")
                                      .replace(/\\f/g, "\\f")
                                      .replace(/\:\\/g, ":");
            res.send(JSON.parse(myEscapedJSONString));
            // TODO: There is an issue with reaching to the server side from app2.js
            console.log("IT ESCAPED");
        }
    });
});

// POST a user
app.post('/users', function(req, res){
  console.log('create new user', req.body.data);
  Users.create(req.body.data);
    res.send(req.body.data);
});

// POST all of the seed data
// app.get('/seed', function(req,res) {
//     console.log('seeding', req.body);
//     addUser(seedData);
//     res.send('seedData added');
//     addQuestions(questionOne);
//     addQuestions(questionTwo);
//     addQuestions(questionThree);
//     addQuestions(questionFour);
//     addQuestions(questionFive);
//     addQuestions(questionSix);
//     addQuestions(questionSeven);
// });

app.listen(port, function() {
  console.log('Let\'s use port: ', port);
  console.log(api_key);
});
