DROP DATABASE IF EXISTS Warehouse_db;
CREATE DATABASE Warehouse_db;
USE Warehouse_db;

CREATE TABLE Products (
    ItemId INT(10) PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(255),
    Quantity INT(10)
    Price DECIMAL(6,2),
  
