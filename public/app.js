console.log('====================================');
console.log('test');
console.log('====================================');

var app = angular.module('altCong', ["ngRoute"]);
myURL = 'https://alt-congress-api.herokuapp.com'
// myURL = 'http:/localhost:3001'
let YOUR_API_KEY = 'AIzaSyDwqIK4aVJNyxqRy6oY_jVJ54G5O8sXp5Y';

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
    this.qand_as = [];
    this.formdata = {};
    
    // SHOW TRIGGERS
    this.showHomePage = true;
    this.showDetailsPage = false;
    this.showMissionPage = false;
    this.showQuestionsPage = false;
    this.showGetInvolvedPage = false;
    this.showQAForAdmin = false;
    this.showUserListForAdmin = false;
    this.showForm = true;

    // clear all pages that are up
    this.clearScreen = () =>{
        console.log('running clear screen');
        this.showHomePage = false;
        this.showDetailsPage = false;
        this.showMissionPage = false;
        this.showQuestionsPage = false;
        this.showGetInvolvedPage = false;
        this.showQAForAdmin = false;
        this.showUserListForAdmin = false;
    }

////////// POST THE NEW USER TO THE SERVER ///////////
    this.processForm = () => {
        console.log('Formdata: ', this.formdata);
        if(this.formdata.i_fund == null){
            this.formdata.i_fund = false;
            console.log('fund', false)
        }
        if(this.formdata.i_join == null){
            this.formdata.i_join = false;
            console.log('join', false)
        }
        if(this.formdata.i_vote == null){
            this.formdata.i_vote = false;
            console.log('vote', false)
        }
        if(this.formdata.verified == null){
            this.formdata.verified = false;
            console.log('verified', false)
        }
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
            this.users = response.data.users;
            console.log(this.users);
        }.bind(this));
    }

    this.getQuestions = () => {
        $http({
            method: 'GET',
            url: myURL + '/qand_as'
        }).then(function(response) {
            console.log(response)
            this.qand_as = response.data.qand_as;
        }.bind(this));
    }


//////////// SEARCH FOR DISTRICT ///////////

//must first find the lat and long using google API
    
    //grab the data from street address, city and state.

    this.findLatAndLong = (formdata) => {
        if (formdata.address && formdata.city &&formdata.State) {
            let newAddress = formdata.address.replace(/ /g, '+');
            let newCity = formdata.city.replace(/ /g, "+");
            // this.formdata.state = formdata.state;
            // console.log('====================================');
            // console.log(newAddress);
            // console.log(newCity);
            // console.log('====================================');

            $http ({
                method: 'GET',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+ newAddress + ',+' + newCity + ',+'+formdata.State+'&key=' + YOUR_API_KEY
            }).then(function(response){
                // console.log(response.data.results[0].geometry.location.lat)
                // console.log(response.data.results[0].geometry.location.lng)
                let newLat = response.data.results[0].geometry.location.lat;
                let newLng = response.data.results[0].geometry.location.lng;
                this.formdata.zip = response.data.results[0].address_components[7].long_name;
                
//must find district using sunlightlabs.github.io/congress

                $http ({
                    method: 'GET',
                    url: 'https://congress.api.sunlightfoundation.com/districts/locate?latitude=' + newLat + '&longitude=' + newLng
                }).then(function(response){
                    // console.log(response.data.results[0].district)
                    this.formdata.district = response.data.results[0].district
                }.bind(this));
            }.bind(this));
            //   https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
            console.log(formdata)
        }
    }







///////////////////////////////////////////

    // this.getUsers();
    this.getQuestions();
}]);