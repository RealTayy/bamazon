// This requires npm table package
// https://www.npmjs.com/package/table#table-usage

var { table } = require('table');

module.exports = function displayItems(arr) {
    if (arr === undefined || arr.length === 0) throw new Error("Array is empty or undefined");

    var options,
        data = [],
        output;

    // Grabs keys from arr[0] and pushes to data to use for table's header
    data.push(Object.keys(arr[0]))

    // Creates and pushes a newRow to data for each index in arr
    arr.forEach(function (obj) {
        var newRow = [];
        for (var key in obj) {
            if (key === 'price') newRow.push('$' + obj[key]);
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