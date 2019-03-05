DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL,
	product_name VARCHAR(100) NULL,
	department_name VARCHAR(50) NULL,
	price DECIMAL(10,3) NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
);