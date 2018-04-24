// This requires npm table package
// https://www.npmjs.com/package/table#table-usage

var { table } = require('table');

module.exports = function displayItems(dataArr, formatArr) {
    if (dataArr === undefined || dataArr.length === 0) throw new Error("Array is empty or undefined");

    var options,
        data = [],
        output;

    // Grabs keys from arr[0] and pushes to data to use for table's header
    data.push(Object.keys(dataArr[0]))

    // Creates and pushes a newRow to data for each index in arr
    dataArr.forEach(function (obj) {
        var newRow = [];
        for (var key in obj) {
            // If key exist in format arr formats it to currency display
            if (formatArr) {
                if (formatArr.includes(key)) newRow.push('$' + obj[key].toFixed(2));
                else newRow.push(obj[key]);
            }
            else newRow.push(obj[key]);
        }
        data.push(newRow);
    });

    // This is the config for how the cells display
    options = {
        drawHorizontalLine: function (index, size) {
            return index === 0 || index === 1 || index === size;
        },
        columns: {
            3: { alignment: 'right' }
        }
    }

    output = table(data, options);
    console.log(output);
}