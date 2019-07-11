DROP DATABASE IF EXISTS customerView_DB;
CREATE DATABASE customerView_DB;
USE customerView_DB;

CREATE TABLE products_custmer(
    item_id INT  NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price  DECIMAL(10,2) NULL,
    stock_quantity INTEGER(30) NULL,
    Sold_item INTEGER(30) NULL,
    product_Sale INTEGER(30) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products_custmer(product_name,department_name, price, stock_quantity,Sold_item,product_Sale)
VALUES ("Loreal_Foundation","Cosmatic",49.9,40,0,0),
("Neutrogean_Foundation","Cosmatic",20,100,0,0),
("chick_Shampoo","Hair_product",15,30,0,0),
("valvet_Shampoo","Hair_product",10,40,0,0),
("Apple_Watch","Electronics",7,450,0,0),
("Laptop","Electronics",10,400,0,0),
("NightTimeStoryBook","KIDS_Book",25,80,0,0),
("Animal_Book","KIDS_Book",5,10,0,0),
("LuxHairColor","HairSPA",18,50,0,0),
("HairMask","HairSPA",11,42,0,0);



CREATE TABLE departments(
department_id INT  NOT NULL AUTO_INCREMENT,
 department_name VARCHAR(30) NULL,
 over_head_costs DECIMAL(10,2) NULL,
 PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name,over_head_costs) 
VALUES ("Cosmatic",3000),
("Hair_product",6000),
("Electronics",4000),
("KIDS_Book",4000),
("HairSPA",2500);

SELECT D.department_id AS DEPARTMENT_ID,D.department_name AS DEPARTMENT_NAME,D.over_head_costs AS OVER_HEAD_COST,PC.product_Sale AS PRODUCT_SALE,(D.over_head_costs - PC.product_Sale) AS TOTAL  FROM departments AS D INNER JOIN products_custmer AS PC ON D.department_name = PC.department_name GROUP BY product_Sale;
SELECT * FROM products_custmer;
SELECT * FROM departments;