var dt = new Date();
var date = (("0"+dt.getDate()).slice(-2)) +"."+ (("0"+(dt.getMonth()+1)).slice(-2)) +"."+ (dt.getFullYear());
var time =(("0"+dt.getHours()).slice(-2)) +":"+ (("0"+dt.getMinutes()).slice(-2));



var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/ttyS0', {
        baudRate: 19200
    }),
    Printer = require('thermalprinter');


serialPort.on('open',function() {

    var printer = new Printer(serialPort);
    printer.on('ready', function() {
      console.log("printing");
        printer
        .center()
        .horizontalLine(16)
        .bold(true)
        .printLine('GOOD MORNING')
        .bold(false)
        .inverse(true)
        .big(true)
        .printLine('Le quotidien')
        .horizontalLine(16)
        .big(false)
        .inverse(false)
        .printLine(date)

            .print(function() {
                console.log('done');
                process.exit();
            });
    });
});
