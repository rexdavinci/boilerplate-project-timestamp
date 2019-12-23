// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function(req, res){
  var date = new Date()
  return res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  })       
})

app.get("/api/timestamp/:date", function(req, res){
  var date = req.params.date
  var isNumber = Number(date)
  var isString = new Date(date)
  if(isNumber && typeof isNumber === 'number'){
    var utc = new Date(isNumber).toUTCString()
    return res.json({
      "unix": isNumber,
      "utc": utc
    })
  }else{
    var validDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date)
    if(validDate){
      return res.json({
        "unix": isString.getTime(),
        "utc": isString.toUTCString()
      })  
    }
    return res.json({
      "error": "Invalid Date"
    })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
