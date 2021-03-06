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

CREATE TABLE departments (
department_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30) NOT NULL UNIQUE,
over_head_costs DEC(20,2) UNSIGNED NOT NULL DEFAULT 0.00
);