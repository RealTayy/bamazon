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
    console.log('Connected as a Supervisor');

    // If connection doesn't run into an error then call promptChoices();
    promptChoices();
});

function promptChoices() {
    
}