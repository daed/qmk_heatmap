
class Data {

    constructor() {
        this.rows = {};
    }    
    
    add(row, column, value) {
        console.log('Data::add()');
        if (!(row in Object.keys(this.rows))) {
            console.log(`Data::add(): adding ${row}`);
            this.rows[row] = new Row();
        }
        else {
            console.log(`Data::add(): we think ${row} is in ${Object.keys(this.rows)}`);
        }
        console.log(`Data::add(): this.rows[${row}].add(${column}, ${value})`);
        try {
            this.rows[row].add(column, value);
        } catch (TypeError) {
            console.log(`Data::add(): caught TypeError`);
            this.rows[row] = new Row();
            this.rows[row].add(column, value);
        }

    }
  
    get(row, column) {
        return this.rows[row].get(column);
    }

    getAll() {
        console.log('Data::getAll() invoked');
        console.log(`Data::getAll(): row count: ${this.rows.length}`);
        console.log(`Data::getAll(): we think we have these rows ${Object.keys(this.rows)}`);
        var arr = [];
        for (var x = 0; x < Object.keys(this.rows).length; x++) {
            var xVal = Object.keys(this.rows)[x];
            console.log(`Data::getAll(): xVal ${xVal}`);
            for (var y = 0; y < Object.keys(this.rows[xVal].cols).length; y++) {
                var yVal = Object.keys(this.rows[xVal].cols)[y];
                console.log(`Data::getAll(): yVal ${yVal}`);
                arr.push({'x': xVal, 'y': yVal, 'value': this.rows[xVal].cols[yVal].value});
            }
        }
        console.log(arr);
        return arr;
    }
}

class Row {
    constructor() {
        this.cols = {};
    }
    
    add(column, value){
        if (!(column in Object.keys(this.cols))) {
            console.log(`Row::add(): adding ${column}`);
            this.cols[column] = new Col();
        }
        else {
            console.log(`Row::add(): we think ${column} is in ${Object.keys(this.cols)}`);
        }
        try {
            this.cols[column].value += Number(value);            
        } catch (TypeError) {
            console.log(`Row::add(): caught TypeError`);
            this.cols[column] = new Col();
            this.cols[column].value += Number(value);   
        }
        console.log(`Row::add(): this.cols[${column}].value = ${this.cols[column].value}`);
    }

    get(column) {
        return this.cols[column].value;
    }
}

class Col {
    constructor() {
        this.value = Number(0);
    }
}

export default Data;