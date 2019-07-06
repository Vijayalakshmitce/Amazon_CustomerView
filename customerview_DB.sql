DROP DATABASE IF EXISTS customerView_DB;
CREATE DATABASE customerView_DB;
USE customerView_DB;


CREATE TABLE products_custmer(
    item_id INT  NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price  DECIMAL(10,2) NULL,
    stock_quantity INTEGER(30) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products_custmer(product_name,department_name, price, stock_quantity )
VALUES ("Loreal_Foundation","Cosmatic",49.9,40),
("Neutrogean_Foundation","Cosmatic",20,100),
("chick_Shampoo","Hair_product",15,30),
("valvet_Shampoo","Hair_product",10,40),
("Apple_Watch","Electronics",7,450),
("Laptop","Electronics",10,400),
("NightTimeStoryBook","KIDS_Book",25,80),
("Animal_Book","KIDS_Book",5,10),
("LuxHairColor","HairSPA",18,50),
("HairMask","HairSPA",11,42);
SELECT * FROM products_custmer ;




