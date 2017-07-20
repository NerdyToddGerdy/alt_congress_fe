console.log('====================================');
console.log('test');
console.log('====================================');

var app = angular.module('altCong', []);
myURL = 'https://alt-congress-api.herokuapp.com'

app.controller('mainController', ['$http', function($http) {
    // this.message = "controller works";
    this.users = [];
    this.formdata = {};

    this.processForm = function() {
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
}])