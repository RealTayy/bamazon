DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE products (
id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DEC(12,2) UNSIGNED NOT NULL,
stock_quantity INT (10) UNSIGNED NOT NULL,
product_sales DEC(20,2) UNSIGNED NOT NULL DEFAULT 0.00
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4", "Electronics", 399.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox One", "Electronics", 499.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("70-INCH LED 4K HD TV", "Electronics", 1099.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Google home mini", "Electronics", 49.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("King size bed", "Furniture", 559.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Love sofa", "Furniture", 399.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wooden Bookcase", "Furniture", 99.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bear rug", "Furniture", 129.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oxford shoes", "Clothing", 39.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plain White Tee", "Clothing", 9.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Compression pants", "Clothing", 19.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Under Armor Socks", "Clothing", 4.99, 1000);

CREATE TABLE departments (
department_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL UNIQUE,
over_head_costs DEC(20,2) UNSIGNED NOT NULL DEFAULT 0.00
);

INSERT INTO departments (department_name, over_head_costs) VALUES
("Electronics", 10000.00),
("Furniture", 7500.00),
("Clothing", 4000.00);

#SELECT d.department_id, d.department_name, d.over_head_costs, sum(p.product_sales) as product_sales, (sum(p.product_sales) - d.over_head_costs) AS total_profit
#FROM departments as d
#INNER JOIN products as p ON p.department_name = d.department_name
#GROUP BY d.department_name
#ORDER BY d.department_id;

UPDATE products SET product_name = "KEKE", product_sales = product_sales + 1.00 WHERE id = 1;

SELECT * from products;

SELECT * from departments;