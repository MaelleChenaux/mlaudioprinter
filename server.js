// printerReady
var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');

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

var settings = [0, 1, 2];
// SEND server
var app = express();

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
console.log("online");


var options = {
  key: fs.readFileSync('ssl/key.key'),
  cert: fs.readFileSync('ssl/raspcert.cer')
};


var server = app.listen(3000);
https.createServer(options, app).listen(2000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/basic_post_action/", post_action);
app.post("/setParams/", setParams);
app.get("/basic_get_action/:param1/:param2", get_action);

function post_action(req, res) {
  console.log("post action");
  let data = req.body;
  console.log("message recived: " + JSON.stringify(data));
  console.log(data.label);

  if(settings[data.label] == 0) {
    getMeteo();
  } else if (settings[data.label] == 1){
    //getSudoku();
    //getNews();
    getWord();
  } else if (settings[data.label] == 2){
    //getWord();
    getJoke();
    //getHoroscope();
  } else if (settings[data.label] == 3){
    //getWord();
    getNews();
    //getHoroscope();
  } else if (settings[data.label] == 4){
    //getWord();
    //getNews();
    getHoroscope();
  }

  // Sent back to computer as result
  res.send("thank you");
}
function setParams(req, res) {
  console.log("post action");
  let data = req.body;
  console.log("message recived: " + JSON.stringify(data));
  settings[0] = data.label0;
  settings[1] = data.label1;
  settings[2] = data.label2;
  // Sent back to computer as result
  res.send("thank you");
}


///SUDOKU
function getSudoku() {
      if(printerReady) {
        printer
        .printImage("3.png")
            .print(function() {
                console.log('done');
            });
      }
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
            .left()
            .inverse(true)
            .printLine('JOKE OF THE DAY')
            .inverse(false)
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
      console.log(JSON.parse(data).articles[0].description);
      if(printerReady) {
        printer
            .left()
            .inverse(true)
            .printLine('NEWS')
            .inverse(false)
            .printLine(JSON.parse(data).articles[0].description)
            .printLine('')
            .printLine('')
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
      console.log(JSON.parse(data).horoscope);
      if(printerReady) {
        printer
            .left()
            .inverse(true)
            .printLine('HOROSCOPE')
            .inverse(false)
            .printLine(JSON.parse(data).horoscope)
            .printLine('')
            .printLine('')
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


//METEO
function getMeteo() {
  https.get('https://api.darksky.net/forecast/2ebee6ae2905747898ba06e19b272038/46.519653,6.632273', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(data).daily.summary);
      if(printerReady) {
        printer
            .left()
            .inverse(true)
            .printLine('WEATHER')
            .inverse(false)
            .printLine(JSON.parse(data).daily.summary)
            .printLine('')
            .printLine('')
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


// WORDOFTHEDAY
function getWord() {
  https.get('https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=55237b70fefb31e7f560a0dac07035bd0e47772c1322d6a84', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      console.log(JSON.parse(data).word);
      //printer.queue (JSON.parse(data));
      if(printerReady) {
        printer
            .printLine(JSON.parse(data).word)
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
