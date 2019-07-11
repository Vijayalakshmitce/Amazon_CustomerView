var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
//Table connection
var table = new Table({
    defaultValue: 0, //defaults to "?"
    errorOnNull: false, //defaults to false but shown for illustration
    head: ['DEPARTMENT_ID', 'DEPARTMENT_NAME', 'OVER_HEAD_COST', 'PRODUCT_SALE', 'TOTAL'],
    colWidths: [20, 20, 20, 20, 20]
});

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
    name: "supervisorChoice",
    choices: ["View Product Sales by Department", "Create New Department"]

}]).then(function (superChoice) {
    if (superChoice.supervisorChoice === "View Product Sales by Department") {
        connection.query("SELECT D.department_id AS DEPARTMENT_ID,D.department_name AS DEPARTMENT_NAME,D.over_head_costs AS OVER_HEAD_COST,PC.product_Sale AS PRODUCT_SALE,(D.over_head_costs - PC.product_Sale) AS TOTAL  FROM departments AS D INNER JOIN products_custmer AS PC ON D.department_name = PC.department_name GROUP BY product_Sale ", function (err, res) {


            for (var i = 0; i < res.length; i++) {
                table.push(
                    [res[i].DEPARTMENT_ID, res[i].DEPARTMENT_NAME, res[i].OVER_HEAD_COST, res[i].PRODUCT_SALE, res[i].TOTAL]

                );

            }
            console.log(table.toString());

        })

        connection.end();

    }
    ///if loop end here
    else if (superChoice.supervisorChoice === "Create New Department") {
        inquirer.prompt([{
            type: "input",
            name: "departName",
            message: "What department do you want add?"
        }, {
            type: "input",
            name: "departCost",
            message: "how much department OVER HEAD Cost do you want add?"
        }]).then(function (departinsert) {
            connection.query("INSERT INTO departments (department_name,over_head_costs) VALUES (?,?)", [departinsert.departName, departinsert.departCost], function (error, res) {
                if (error) throw error;
                var affectedrows = res.affectedRows;
                console.log("************************************\n");
                console.log("Your Product inserted into the Store");
                console.log(affectedrows + "   Row inserted");
                console.log("************************************\n")
            });
            connection.end();
        });

    }
    //else if loop end here
});
//inquiere end closure here