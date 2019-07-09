var mysql = require('mysql');
var inquirer = require('inquirer');

//connection declare start
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sairakshna5*",
    database: "customerView_DB"
});
///connection declare end closure
//inquirer start here
inquirer.prompt([{
    type: "list",
    name: "managerList",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

}]).then(function (userChoice) {
    if (userChoice.managerList === "View Products for Sale") {

        connection.query("SELECT item_id,product_name,price,stock_quantity FROM products_custmer", function (error, productRes) {
            for (var i = 0; i < productRes.length; i++) {
                var productID = productRes[i].item_id;
                var productName = productRes[i].product_name;
                var productPrice = productRes[i].price;
                var productQuantity = productRes[i].stock_quantity;

                console.log("*************************\n");
                console.log("Product ID: " + productID);
                console.log("Product Name: " + productName);
                console.log("productPrice: " + productPrice);
                console.log("Product Quantity: " + productQuantity);
            }
            //for loop end here    
        });
        //query end clousure here
        connection.end();
    }
    ///if end clousure here
    else if (userChoice.managerList === "View Low Inventory") {

        connection.query("SELECT item_id,product_name,stock_quantity FROM products_custmer where stock_quantity < 5", function (error, inventres) {
            if (error) throw error;
            for (var i = 0; i < inventres.length; i++) {
                var productID = inventres[i].item_id;
                var productName = inventres[i].product_name;
                var productQuantity = inventres[i].stock_quantity;
                var productSold = inventres[i].Sold_item;

                console.log("*************************************\n");
                console.log("Product ID: " + productID);
                console.log("Product Name: " + productName);
                console.log("Product Quantity: " + productQuantity);
                console.log("Product Sold: " + productSold);
                console.log("_________________________________________\n");

            }
            //for loop end here
        });
        //connection query end closure here
        connection.end();
    }
    //else if end closure here
    else if (userChoice.managerList === "Add to Inventory") {
        inquirer.prompt([{
            type: "input",
            name: "userProductID",
            message: "What is your Product Id ?"

        }, {
            type: "input",
            name: "userQuantity",
            message: "How many Quantity do you want to add?"
        }]).then(function (answer) {

            connection.query("SELECT item_id,product_name,stock_quantity FROM products_custmer where item_id ='" + answer.userProductID + "'", function (err, res) {
                if (err) throw err;
                var newStockQuantity = parseInt(res[0].stock_quantity) + parseInt(answer.userQuantity);
                var productID = res[0].item_id;
                var productName = res[0].product_name;
                console.log("************************************\n");
                console.log("Product ID: " + productID);
                console.log("Product Name: " + productName);

                connection.query("UPDATE products_custmer SET stock_quantity = '" + newStockQuantity + "' WHERE item_id = '" + answer.userProductID + "'", function (error, result) {
                    if (error) throw error;
                });
                //update query end closure here
                connection.query("SELECT stock_quantity FROM products_custmer where item_id = '" + answer.userProductID + "'", function (errors, resultstock) {
                    if (errors) throw errors;
                    var product_Newquantity = resultstock[0].stock_quantity;
                    console.log("Product New Quantity: " + product_Newquantity);
                    console.log("******************************************\n");
                });
                /// query stock end closure here
            });
            //inner query end closure here
        });
        //inquiere end here
    }
    //else if end closure here
    else if (userChoice.managerList === "Add New Product") {
        inquirer.prompt([{
            type: "input",
            name: "userProductName",
            message: "What's your Product Name do you wnat to add?"
        }, {
            type: "input",
            name: "userDepartName",
            message: "What's your department name do you wnat to add?"
        }, {
            type: "input",
            name: "userProductPrice",
            message: "What's your price for your product(per unit) do you want to add?"
        }, {
            type: "input",
            name: "userQuantity",
            message: "What's your Product Stock Quantity do you wnat to add?"
        }]).then(function (answer) {

            connection.query("INSERT INTO products_custmer (product_name,department_name, price, stock_quantity,Sold_item,product_Sale) VALUES (?,?,?,?,?,0)", [answer.userProductName, answer.userDepartName, answer.userProductPrice, answer.userQuantity, 0], function (error, res) {
                if (error) throw error;
                var affectedrows = res.affectedRows;
                console.log("************************************\n");
                console.log("Your Product inserted into the Store");
                console.log(affectedrows + "   Row inserted");
                console.log("************************************\n")

            });

            connection.end();
        }).catch(function (error) {
            console.log(error);
        });
        //inquiere end closure here
    }
    //else if end closure here
});
//inquirer end closure here