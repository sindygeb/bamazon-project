var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runBamazon();
});

function runBamazon() {[
    inquirer
        .prompt({
            type: "input",
            name: "action",
            message: "Please enter the item ID of what you would like to purchase.",
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'amount',
            message: "How many would you like?",
            validate: validateInput,
            filter: Number

        }).then(function(res) {
            var item = res.action;
            var amount = res.amount
        })