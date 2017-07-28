console.log('====================================');
console.log('test');
console.log('====================================');

var app = angular.module('altCong', ["ngRoute"]);
myURL = 'https://alt-congress-api.herokuapp.com'
// myURL = 'http:/localhost:3001'

app.config(($routeProvider) => {
    $routeProvider
    .when("/admin", {
        templateUrl : "./partials/admin.html"
    })
    .when('/', {
        templateUrl : "./partials/main.html"
    });
})

app.controller('mainController', ['$http', function($http) {
    // this.message = "controller works";
    this.users = [];
    this.formdata = {};
    
    // SHOW TRIGGERS
    this.showHomePage = true;
    this.showDetailsPage = false;
    this.showMissionPage = false;
    this.showQuestionsPage = false;
    this.showQAForAdmin = false;
    this.showUserListForAdmin = false;

    // clear all pages that are up
    this.clearScreen = () =>{
        console.log('running clear screen');
        this.showHomePage = false;
        this.showDetailsPage = false;
        this.showMissionPage = false;
        this.showQuestionsPage = false;
        this.showQAForAdmin = false;
        this.showUserListForAdmin = false;
    }

////////// POST THE NEW USER TO THE SERVER ///////////
    this.processForm = () => {
        console.log('Formdata: ', this.formdata);
        $http({
            method: 'POST',
            url: myURL + '/users',
            data: this.formdata
        }).then(function(result){
            console.log('====================================');
            console.log('Data from server: ', result);
            console.log('====================================');
        })
    }



////////// PULL THE USERS FROM THE SERVER ////////////
    this.getUsers = () => {
        $http({
            method: 'GET',
            url: myURL + '/users'
        }).then(function(response){
            // console.log('====================================');
            console.log(response);
            // console.log('====================================');
            this.users = response.data.users
            console.log(this.users);
        }.bind(this));
    }

    this.getQuestions = () => {
        $http({
            method: 'GET',
            url: myURL + '/quest_and_ans'
        }).then((response)=> {
            console.log(response)
        })
    }

    // this.getUsers();
    this.getQuestions();
}]);