import { isNull, isUndefined } from 'util';
import writeHtmlFile from './pageGenerator';
import Data from './data';
const exec = require('child_process').spawn;
const process = require('process');
const fs = require('fs');
var target = `${process.cwd()}/hid_listen/hid_listen.exe`;
var filename = `${process.cwd()}/data/keystrokeCount.csv`;
console.log(`cwd is ${process.cwd()}`);

var data = new Data();

function hid_listen() {
    console.log('hid_listen()');
    var readStream = fs.readFileSync(filename);
    var dataArray = readStream.toString();
    if (dataArray !== null) {
        var dataArray = dataArray.toString().split('\n');
        for (var i = 0; i < dataArray.length; i++) {
            var line = dataArray[i].split(',');
            //console.log(dataArray[i]);
            if (line.length != 3) {
                console.log(`Error: Wrong line length: ${line}`);
            }
            else {
                data.add(line[0], line[1], line[2]);
            }
        }
    }
    
    var run = exec(target);
    run.stdout.on('data', (rawdata) => {
        var writeStream = fs.createWriteStream(filename);
        console.log(`raw data: ${rawdata}`);
        console.log('hid_listen::spawn.onData()');
        var strArray = rawdata.toString().split('\r\n');
        for (var i = 0; i < strArray.length; i++) {
            if (!strArray[i].includes('Waiting for device')
                && !strArray[i].includes('debug') 
                && !strArray[i].includes('.')) {
                //console.log(`${i}: ${strArray[i]}`);
                var line = strArray[i].split(',');
                if (line.length != 3) {
                    console.log(`Error: Wrong line length: ${line}`);
                }
                else {
                    console.log(line[0].toString());
                    data.add(line[0], line[1], line[2]);
                }
            }
        }

        var out = data.getAll();
        for (var i = 0; i < out.length; i++) {
            console.log(out[i]);
            writeStream.write(`${out[i].x},${out[i].y},${out[i].value}\n`);
        }
        writeStream.close();

        writeHtmlFile(data);
    });
} 

export default hid_listen;