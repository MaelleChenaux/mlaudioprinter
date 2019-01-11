var lp = require("lp-client");
var express = require("express");
var bodyParser = require("body-parser");

const https = require('https');

var options = {};
var printer = lp(options);


var app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

console.log("online");

var server = app.listen(3000);

app.use(express.static("webpage"));

app.post("/basic_post_action/", post_action);
app.get("/basic_get_action/:param1/:param2", get_action);

function post_action(req, res) {
  console.log("post action");
  let data = req.body;
  console.log("message recived: " + JSON.stringify(data));


  if(data.label == 0) {
    getJoke();
  }


  //printer.queue (data.label);

  //printer.queueFile(__dirname + '/tst.rtf');
  // Sent back to computer as result
  res.send("thank you");
}
function getJoke() {
  https.get('https://geek-jokes.sameerkumar.website/api', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(data));
      printer.queue (JSON.parse(data));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}
function get_action(req, res) {
  let data = req.params;
  console.log("user asked for stuff like that:");
  console.log(data.param1);
  console.log(data.param2);
  let sum = Number(data.param2) + Number(data.param1);
  console.log("so we answer:");
  console.log("sum = " + sum);
  res.send("sum = " + sum);
}
