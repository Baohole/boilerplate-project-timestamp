// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const date = req.params.date ? req.params.date : Date.now()
  let parserDate = new Date(date);

  // Check if date is invalid (NaN)
  if (isNaN(parserDate)) {
    // Try parsing as a number (for Unix timestamps)
    parserDate = new Date(parseInt(date));
  }

  if (isNaN(parserDate)) {
    return res.json({ error: "Invalid Date" });
  }
  res.json({ unix: parserDate.getTime(), utc: parserDate.toUTCString() });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
