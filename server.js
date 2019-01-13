// printerReady
var express = require("express");
var bodyParser = require("body-parser");

//date et heure
var dt = new Date();
var date = (("0"+dt.getDate()).slice(-2)) +"."+ (("0"+(dt.getMonth()+1)).slice(-2)) +"."+ (dt.getFullYear());
var time =(("0"+dt.getHours()).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2));


const https = require('https');
var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/ttyS0', {
        baudRate: 19200
    }),

Printer = require('thermalprinter');
var printerReady = false;
var printer;
serialPort.on('open',function() {
    printer = new Printer(serialPort);
    printer.on('ready', function() {
      console.log("printerReady");
      printerReady = true;
      printer
          .center(true)
          .horizontalLine(16)
          .bold(true)
          .printLine('GOOD MORNING')
          .bold(false)
          .inverse(true)
          .big(true)
          .printLine('Le quotidien')
          .big(false)
          .inverse(false)
          .horizontalLine(16)
          .printLine(date)
          .printLine(time)
          .printLine('')
          .printLine('')

    });
});

// SEND server
var app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
console.log("online");

//Mot de bienvenue

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
  } else if (data.label == 1){
    getNews();
    getMeteo();
    //getWord();
  } else if (data.label == 2){
    getHoroscope();
  }
  // Sent back to computer as result
  res.send("thank you");
}



// JOKE
function getJoke() {
  https.get('https://geek-jokes.sameerkumar.website/api', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(data));
      if(printerReady) {
        printer
            .left(true)
            .medium(true)
            .printLine('JOKE OF THE DAY')
            .printLine(JSON.parse(data))
            .printLine('')
            .printLine('')
            .print(function() {
                console.log('done');
            });
      }
      else {
        console.log("not ready")
      }

    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}


// NEWS
function getNews() {
  https.get('https://newsapi.org/v2/top-headlines?sources=google-news-fr&apiKey=eb40180347c54e3a9ba51a1327ab80d8', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(this.responseText).totalResults);
      if(printerReady) {
        printer
            .left(true)
            .small(true)
            .printLine('News')
            .printLine(JSON.parse(this.responseText).totalResults)
            .print(function() {
                console.log('done');
                //process.exit();
            });
      }
      else {
        console.log("not ready")
      }
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}


// HOROSCOPE
function getHoroscope() {
  https.get('https://horoscope-api.herokuapp.com/horoscope/today/Virgo', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(this.responseText).horoscope);
      if(printerReady) {
        printer
            .printLine(JSON.parse(this.responseText).horoscope)
            .print(function() {
                console.log('done');
                process.exit();
            });
      }
      else {
        console.log("not ready")
      }
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}


//METEO
function getMeteo() {
  https.get('https://what-weather-dark-sky.glitch.me/api/46.519653/6.632273', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(this.responseText).latitude);
      if(printerReady) {
        printer
            .printLine(JSON.parse(this.responseText).latitude)
            .print(function() {
                console.log('done');
                process.exit();
            });
      }
      else {
        console.log("not ready")
      }
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
