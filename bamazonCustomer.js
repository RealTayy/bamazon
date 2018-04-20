// NPM Packages
var mysql = require('mysql');
var inquirer = require('inquirer');

// Other stuff
var displayItems = require('./displayItems.js');
var validator = require('./validator.js');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to "bamazon" with threadID:' + connection.threadId);
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
            console.log('Here is a list of our item...');
            displayItems(results);

            // Starts prompts
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "itemID",
                        message: "Please enter the ID of the item you would like to buy",
                        validate: function (input) {
                            if (!/[0-9]+/.test(input)) return 'That isn\'t a number. Please try again';
                            if (parseInt(input) > results.length) return 'That ID doesn\'t exist. Please try again';
                            return true;
                        }
                    },
                    {
                        type: "input",
                        name: "quantity_buying",
                        message: "Please enter the amount you would like to purchase",
                        validate: validator.isNum
                    }
                ])
                .then(function (answers) {
                    // Attempts to buy item with user's answers
                    buyItem(answers.itemID, answers.quantity_buying);
                });
        }
    )
}

function buyItem(itemID, quantity) {
    console.log(itemID, quantity);
}
