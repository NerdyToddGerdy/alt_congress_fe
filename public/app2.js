console.log('====================================');
console.log('testing app2.js');
console.log('====================================');


console.log('app2 is a go');

var app = angular.module('altCong', ["ngRoute"]);
myURL = 'http://localhost:56789';

app.controller('mainController', ['$http', function($http) {
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
  };

////////// POST THE NEW USER TO THE SERVER ///////////
this.processForm = () => {
  let newData = this.formdata;
  console.log('Formdata: ', newData);
  if(this.formdata.i_fund === null){
    this.formdata.i_fund = false;
    console.log('fund', false);
  }
  if(this.formdata.i_join === null){
    this.formdata.i_join = false;
    console.log('join', false);
  }
  if(this.formdata.i_vote === null){
    this.formdata.i_vote = false;
    console.log('vote', false);
  }
  if(this.formdata.verified === null){
    this.formdata.verified = false;
    console.log('verified', false);
  }
  $http.post(myURL + '/users', {data: this.formdata});

};

////////// PULL THE USERS FROM THE SERVER ////////////
this.getQuestions = () => {
  $http({
    method: 'GET',
    url: myURL + '/questions'
  }).then(function(response) {
    console.log(response);
    this.questions = response.data;
  }.bind(this));
};

//////////// SEARCH FOR DISTRICT ///////////
this.findDistrict = (formdata) => {
  if (formdata.address && formdata.city &&formdata.State) {
    let newAddress = formdata.address.replace(/ /g, '%20');
    let newCity = formdata.city.replace(/ /g, "%20");
    this.formdata.State = formdata.State;
    console.log('====================================');
    // console.log(newAddress);
    // console.log(newCity);
    console.log(this.formdata.State);
    console.log('====================================');

    $http ({
      // FIXME The myURL is not working correctly
      method: 'GET',
      url: myURL + '/districts/' + newAddress + '/' + newCity + '/' + this.formdata.State
    }).then( function(response) {
      // const key = 'ocd-division/country:us/state:' + this.formdata.state + '/cd';
      console.log(response.data.offices[3].divisionId);
      console.log(response.data.divisions[response.data.offices[3].divisionId]);
      this.formdata.zip = response.data.normalizedInput.zip;
      this.formdata.district = response.data.divisions[response.data.offices[3].divisionId].name;
    }.bind(this));
  }
};

///////////////////////////////////////////
  this.getQuestions();

}]);
