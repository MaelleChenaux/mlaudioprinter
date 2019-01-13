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
        .indent(10)
        .horizontalLine(10)
        .bold(true)
        .indent(10)
        .printLine('GOOD MORNING')
        .bold(false)
        .inverse(true)
        .big(true)
        .center()
        .printLine('Le quotidien')
            .print(function() {
                console.log('done');
                process.exit();
            });
    });
});
