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
connection.query("SELECT * FROM products_custmer", function (err, res) {
    console.log(res[0]);
    for (i = 0; i < res.length; i++) {
        //for loop start
        var id = res[i].item_id;
        var Name = res[i].product_name;
        var price = res[i].price;

        console.log("**********************");
        console.log("Product ID:" + id);
        console.log("Product Name: " + Name);
        console.log("Product Price: " + price);
        console.log("-----------------------\n");
    }
    //for loop end   

    inquirer.prompt([{
        type: "input",
        name: "userProductID",
        message: "What is your Product Id for your purchase?"

    }, {
        type: "input",
        name: "userQuantity",
        message: "How many Quantity need to purchase?"
    }]).then(function (answer) {

        console.log(answer.userProductID);

        connection.query("SELECT * FROM products_custmer where item_id = '" + answer.userProductID + "'", function (error, productresult) {
            if (error) throw error;
            var productID = productresult[0].item_id;
            var productName = productresult[0].product_name;
            var user_Quantity = answer.userQuantity;
            console.log("********-------************");
            console.log("Product ID: " + productID);
            console.log("Product Name: " + productName);
            console.log("USER PLACED QUANTITY: " + user_Quantity);
            if ((productresult[0].stock_quantity !== null) && (productresult[0].stock_quantity > 0)) {




                var totalProductQuantity = productresult[0].stock_quantity - user_Quantity;
                var totalProductPurchasePrice = user_Quantity * productresult[0].price;
                var sold_item = parseInt(productresult[0].Sold_item) + parseInt(user_Quantity);
                sold_item = 0;


                var porductSale = parseInt(productresult[0].product_Sale) + parseInt(totalProductPurchasePrice);
                console.log("Total Purchase: " + totalProductPurchasePrice);

                connection.query("UPDATE products_custmer  SET stock_quantity = '" + totalProductQuantity + "' , Sold_item = '" + sold_item + "',product_Sale = '" + porductSale + "'  WHERE item_id = '" + answer.userProductID + "'", function (err, res) {
                    if (err) throw err;
                });


            } else {
                console.log("Sorry Insufficient Stock Quanity");
            }

            connection.end();

        });
        //query connection end closure here


    }).catch(function (err) {
        console.log(err.response);
    });


});
///connection query end-closure