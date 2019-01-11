var SerialPort = require('serialport'),
    serialPort = new SerialPort('/dev/ttyAMA0', {
        baudRate: 19200
    }),
    Printer = require('thermalprinter');


serialPort.on('open',function() {

    var printer = new Printer(serialPort);
    printer.printLine('first line');
    console.log(printer);
    printer.on('ready', function() {
        printer
            .indent(10)
            .horizontalLine(16)
            .bold(true)
            .indent(10)
            .printLine('first line')
            .bold(false)
            .inverse(true)
            .big(true)
            .right()
            .printLine('second line')
            .print(function() {
                console.log('done');
                process.exit();
            });
    });
});
