// NPM Packages
var mysql = require('mysql');
var inquirer = require('inquirer');

// Other imports
var displayItems = require('./displayItems.js');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to "bamazon" with threadID:' ${connection.threadId}`);
    console.log('Connected as a Customer');

    // If connection doesn't run into an error then call promptChoices();
    promptChoices();
});

// Prompts user for initial choice selection
function promptChoices() {
    connection.query(
        "SELECT * FROM products",
        function (err, results) {
            if (err) throw err;
            console.log('Here is a list of our items we have in stock...');
            displayItems(results);

            // Starts prompts
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "itemID",
                        message: "Please enter the ID of the item you would like to buy:",
                        validate: function (input) {
                            if (!/[0-9]+/.test(input)) return 'That isn\'t a number. Please try again';
                            if (parseInt(input) > results.length) return 'That ID doesn\'t exist. Please try again';
                            return true;
                        }
                    },
                    {
                        type: "input",
                        name: "quantity_buying",
                        message: function (answers) {
                            return `Please enter the amount you would like to purchase [0-${results[answers.itemID - 1].stock_quantity}]:`
                        },
                        validate: function (input, answers) {
                            if (!/[0-9]+/.test(input)) return 'That isn\'t a number. Please try again';
                            var inStock = results[answers.itemID - 1].stock_quantity;
                            if (inStock < parseInt(input)) return 'There\'s not enough in stock to buy that much! Try Again';
                            return true;
                        }
                    }
                ])
                .then(
                    function (answers) {
                        // Attempts to buy item with user's answers
                        buyItem(answers.itemID, answers.quantity_buying, results);
                    }
                );
        }
    )
}

function buyItem(itemID, quantity_buying, data) {
    var itemData = data[itemID - 1];
    var numInStock = parseInt(itemData.stock_quantity);
    var newStock = numInStock - quantity_buying;
    var totalCost = (quantity_buying * parseFloat(itemData.price)).toFixed(2);
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE id = ?",
        [newStock, itemID],
        function (err, results) {
            if (err) throw err;
            console.log(`Successfully bought (${quantity_buying}) "${itemData.product_name}" for $${totalCost}!`);
            process.exit();
        }
    )
}
