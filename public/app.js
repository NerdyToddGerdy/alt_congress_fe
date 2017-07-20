console.log('====================================');
console.log('test');
console.log('====================================');

var app = angular.module('altCong', []);

app.controller('mainController', ['$http', function($http) {
    // this.message = "controller works";
    this.users = [];

    $http({
        method: 'GET',
        url: 'http://localhost:3000/users'
    }).then(function(response){
        // console.log('====================================');
        console.log(response);
        // console.log('====================================');
        this.users = response.data.users
        console.log(this.users);
    }.bind(this));
}])