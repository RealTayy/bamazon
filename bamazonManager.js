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
    console.log('Connected as a Manager');

    // If connection doesn't run into an error then call promptChoices();
    promptChoices();
});

// Prompt user with choices
function promptChoices() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'userChoice',
                message: "Would would you like to do Mr. Manager?",
                choices: [
                    'View Products for Sale',
                    'View Low Inventory (<=20)',
                    'Add to Inventory',
                    'Add New Product'
                ]
            }
        ]).then(
            function (answers) {
                switch (answers.userChoice) {
                    case 'View Products for Sale':
                        viewProducts();
                        break;
                    case 'View Low Inventory (<=20)':
                        viewLowInventory();
                        break;
                    case 'Add to Inventory':
                        promptAddStock();
                        break;
                    case 'Add New Product':
                        promptAddNewProduct();
                        break;
                }
            }
        )
}

function viewProducts() {
    connection.query(
        "SELECT * FROM products",
        function (err, results) {
            if (err) throw err;
            console.log('Here is a list of our current items in stock...');
            displayItems(results);
        }
    )
}

function viewLowInventory() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity <= 20",
        function (err, results) {
            if (err) throw err;
            if (getLowestStock(results) > 20) {
                console.log('There are no items that are low in stock');
            }
            else {
                console.log('Here is a list of our inventory with stock less then 20');
                displayItems(results);
            }
        }
    )
}

function getLowestStock(data) {
    var lowestStock = parseInt(data[0].stock_quantity);

    data.forEach(function (obj) {
        lowestStock = Math.min(lowestStock, obj.stock_quantity);
    });

    return lowestStock;
}

function promptAddStock() {
    connection.query(
        "SELECT * FROM products",
        function (err, results) {
            if (err) throw err;
            console.log('Here is a list of our items we have in stock...');
            displayItems(results);

            // Starts prompts to see what item to add and how much
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "itemID",
                        message: "Please enter the ID of the item you would like to add to:",
                        validate: function (input) {
                            if (!/[0-9]+/.test(input)) return 'That isn\'t a number. Please try again';
                            if (parseInt(input) > results.length) return 'That ID doesn\'t exist. Please try again';
                            return true;
                        }
                    },
                    {
                        type: "input",
                        name: "quantity_adding",
                        message: "Please enter the amount you would like to add:",
                        validate: function (input, answers) {
                            if (!/[0-9]+/.test(input)) return 'That isn\'t a number. Please try again';
                            var inStock = results[answers.itemID - 1].stock_quantity;
                            if (inStock < parseInt(input)) return 'There\'s not enough in stock to buy that much! Try Again';
                            return true;
                        }
                    },
                ])
                .then(
                    function (answers) {
                        // Attempts to buy item with user's answers
                        addStock(answers.itemID, answers.quantity_adding, results);
                    }
                );
        }
    )
}

function addStock(itemID, quantity_adding, data) {
    var itemData = data[itemID - 1];
    var numInStock = parseInt(itemData.stock_quantity);
    var newStock = numInStock + parseInt(quantity_adding);
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE id = ?",
        [newStock, itemID],
        function (err, results) {
            if (err) throw err;
            console.log(`Successfully added (${quantity_adding}) "${itemData.product_name}" to inventory
            New amount in stock: ${newStock}`);
        }
    )
}

function promptAddNewProduct() {
    connection.query(
        "SELECT department_name FROM products GROUP BY department_name",
        function (err, results) {
            var departmentArr = [];
            results.forEach(function (obj) {
                departmentArr.push(obj.department_name);
            });
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "itemName",
                        message: "Input the name of your new item:",
                        validate: function (input) {
                            if (input.length > 30) return "Sorry, maximum length of name is 30 charactrs. Please try again";
                            // If input contains any character that isn't whitelisted return error
                            if (/[^0-9a-zA-Z\-\_ ]/.test(input)) return "Sorry, accepted characters are a-Z, 0-9, _, -, or a space";
                            return true;
                        }
                    },
                    {
                        type: "list",
                        name: "departmentName",
                        message: function (answers) {
                            return `Please select which department to add "${answers.itemName}" to:`
                        },
                        choices: departmentArr
                    },
                    {
                        type: "input",
                        name: "itemPrice",
                        message: function (answers) {
                            return `Please input the price of "${answers.itemName}": $`
                        },
                        validate: function (input) {
                            if (!/^[0-9]+\.[0-9]{1,2}$|^[0-9]+$/.test(input)) return "That is not a valid dollar amount! Please try again";
                            return true;
                        }
                    },
                    {
                        type: "input",
                        name: "itemStock",
                        message: function (answers) {
                            return `Please input the initial stock of "${answers.itemName}":`
                        },
                        validate: function (input) {
                            if (!/[0-9]+/.test(input)) return 'That isn\'t a number. Please try again';
                            return true;
                        }
                    }
                ])
                .then(
                    function (answers) {
                        addNewProduct(answers.itemName, answers.departmentName, answers.itemPrice, answers.itemStock);
                    }
                )
        }
    )

}

function addNewProduct(name, department, price, stock) {
    connection.query(
        'INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)',
        [name, department, price, stock],
        function (err, results) {
            if (err) throw err;
            console.log(`Successfully added ${name}(${stock}) into department "${department} at ${price}`)
        }
    )
}