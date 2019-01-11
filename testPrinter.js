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
            .bold(true)
            .indent(10)
            .printLine('first line^is a very long long long long long line')
            .print(function() {
                console.log('done');
                process.exit();
            });
    });
});
