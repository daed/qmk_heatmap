import { isNull } from 'util';

const fs = require('fs');
const process = require('process');

var filename = `${process.cwd()}/data/keystrokeCount.csv`;
var reportFilename = `${process.cwd()}/data/reportFile.html`;

function writeHtmlFile(data) {
    console.log("writeHtmlFile()");
    const meta = '<meta http-equiv="refresh" content="2">';
    const header = `<HTML><HEAD>${meta}</HEAD><BODY>`;
    const footer = "</BODY></HTML>"
    let output = [header];
    output.push('<table>');
    console.log("- starting loop");

    var out = data.getAll();
    for (var i = 0; i < out.length; i++) {
        output.push('<tr>');
        output.push(`<td>${out[i].x}</td>`);
        output.push(`<td>${out[i].y}</td>`);
        output.push(`<td>${out[i].value}</td>`);
        output.push('</tr>')
    }
    console.log("- finished loop");
    output.push('</table>');
    output.push(`<p>Updated last on ${Date.now()}</p>`);
    output.push(footer);

    let msg = "";
    for (var x = 0; x < output.length; x++) {
        msg = msg + output[x];
    }
    fs.writeFileSync(reportFilename, msg);

}

export default writeHtmlFile;