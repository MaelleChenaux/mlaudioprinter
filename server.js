var lp = require("lp-client");
var express = require("express");
var bodyParser = require("body-parser");

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
  let number = data.number;

  console.log("message recived: " + JSON.stringify(data));
  console.log(number + " * " + number + " = " + number * number);


  printer.queue (data.label);
  // Sent back to computer as result
  res.send("thank you");
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
