var express = require('express');
var app     = express();
var port    = PROCESS.ENV.PORT || 3001;

app.use(express.static('public'));

app.listen(port, function(){
    console.log('====================================');
    console.log("AltCongress Frotend running on port: ", port);
    console.log('====================================');
});
