var Termal = require('thermal');
var printer = new Termal('/dev/ttyAMA0', {
    baudrate: 19200
});

printer.on("ready",function(){
  printer.print("Hello World").feed(1)
});
