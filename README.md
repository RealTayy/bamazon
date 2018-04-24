# bamazon
bamazon is a CLI that simulates sales for an online store. It contains 3 programs which interact with the same database:
* Customer
    * Can buy products from the store
* Manager
    * View Products for Sale
    * View Low Inventory (Item less then 20)
    * Add to Inventory
    * Add New Product
* Supervisor
    * Can buy products from the store
    * Can buy products from the store

## Technologies
1. ES6
2. Node.js
3. MySQL

# Installing & Running bamazon
In order for Bamazon to run you will need the following:
* Bash
* Node.js & npm (npm is a native package of Node.js)
* MySQL Workbench

1. Open bash and type `git clone https://github.com/RealTayy/bamazon.git` to pull bamazon off gitHub

![How To 1](images/readme/how_to_1.png?raw=true)

2. Then type `cd bamazon/; npm i` to go into the bamazon folder and install the required npm packages

3. Open MySQL Workbench and connect to `localhost:3306`. After that open `bamazonSchema.sql` and run it. Once the schema has been loaded open `bamazonSeed.sql` and run that to finish loading the initial database/table/entires

Congratulations! You have successfully installed bamazon

# Demos
## Customer
* Customer
    * Can buy products from the store

## Manager
* Manager
    * View Products for Sale
    * View Low Inventory (Item less then 20)
    * Add to Inventory
    * Add New Product

## Supervisor
* Supervisor
    * View Department Sales
    * Add a New Department