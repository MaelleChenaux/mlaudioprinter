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

var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/ttyAMA0', {
        baudRate: 19200
    }),
    Printer = require('thermalprinter');
var printerReady = false;

serialPort.on('open',function() {

    var printer = new Printer(serialPort);
    printer.on('ready', function() {
      console.log("printerReady");
      printerReady = true;
    });
});

function post_action(req, res) {
  console.log("post action");
  let data = req.body;
  console.log("message recived: " + JSON.stringify(data));


  if(data.label == 0) {
    getJoke();
  } else if (data.label == 1){
    getWord();
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
      //printer.queue (JSON.parse(data));
      printer
          .printLine(JSON.parse(data))
          .print(function() {
              console.log('done');
              process.exit();
          });
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}


function getWord() {
  https.get('http://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=55237b70fefb31e7f560a0dac07035bd0e47772c1322d6a84', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(this.responseText).word);
      console.log(JSON.parse(this.responseText).word);
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
