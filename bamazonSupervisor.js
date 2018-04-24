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
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'userChoice',
                message: "What would you like to do Mr. Supervisor?",
                choices: [
                    'View Product Sales by Department',
                    'Create New Department'
                ]
            }
        ])
        .then(
            function (answers) {
                switch (answers.userChoice) {
                    case 'View Product Sales by Department':
                        viewDepartmentSales();
                        break;
                    case 'Create New Department':
                        promptCreateDepartment();
                        break;
                }
            }
        )
}

function viewDepartmentSales() {
    connection.query(
        `SELECT d.department_id, d.department_name, d.over_head_costs,
        sum(p.product_sales) as product_sales,
        (sum(p.product_sales) - d.over_head_costs) AS total_profit
        FROM departments as d
        INNER JOIN products as p ON p.department_name = d.department_name
        GROUP BY d.department_name
        ORDER BY d.department_id;`,
        function (err, results) {
            displayItems(results, ['over_head_costs', 'product_sales', 'total_profit']);
            process.exit();
        }
    )
}

function promptCreateDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: "What would you like your new department to be named?",
            },
            {
                type: 'input',
                name: 'departmentOverHead',
                message: function (answers) {
                    return `What is the overhead of ${answers.departmentName}?`
                },
                validate: function (input) {
                    if (!/^[0-9]+\.[0-9]{1,2}$|^[0-9]+$/.test(input)) return "That is not a valid dollar amount! Please try again";
                    return true;
                }
            }
        ])
        .then(
            function (answers) {
                createDepartment(answers.departmentName, answers.departmentOverHead)
            }
        )
}

function createDepartment(name, overHead) {
    connection.query(
        "INSERT INTO departments (department_name, over_head_costs) VALUES(?, ?)",
        [name, overHead],
        function (err, results) {
            if (err) throw err;
            console.log(`Successfully added new department "${name}" with over head of $${overHead}`);
            process.exit();
        }

    )
}