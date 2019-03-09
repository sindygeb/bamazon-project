var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require("dotenv");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password - * I removed my password for the GitHub Repo *
    password: "",
    database: "bamazon_db"
});

//conection to the server and running the app
connection.connect(function(err) {
    if (err) throw err;
    runBamazon();
});

//function to run the app - connect and show the inventory
function runBamazon () {
    var queryStr = 'SELECT * FROM products';

    connection.query(queryStr, function(err, data) {
        if (err) throw err;
        
        console.log('...................')
		console.log('Current Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '  //  ';
            strOut += 'In Stock: ' + data[i].stock_quantity + '\n';

			console.log(strOut);
		}

	    console.log("---------------------------------------------------------------------\n");

	    userPrompt();
	})
};

//function that lets user choose to purchase another item (which will refresh a new inventory with updated data), or end connection
function shopAgain(){
    inquirer
        .prompt([
            {
                type: "list",
                name: "shop",
                message: "Would you like to buy another item?",
                choices: ["YES", "NO"]
            }
        ]).then(function(answer) {
            if (answer.shop === "YES") {
                runBamazon();
            } else {
                console.log("Thank you for shopping with us, have a nice day!");
                connection.end();
            }
        })
}

//prompts user to purchase inventory items
function userPrompt() {
    inquirer
        .prompt([
        {
            type: "input",
            name: "itemID",
            message: "Please enter the item ID of what you would like to purchase."
        },
        {
            type: "input",
            name: "amount",
            message: "How many would you like?"
        }
        ]).then(function(res) {
            var item = res.itemID;
            var amount = res.amount;

            var queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, {item_id: item}, function(err, data) {
                if (err) throw err;

                if (data.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                    runBamazon();
                } else {
                    var productData = data[0];

                    if (amount <= productData.stock_quantity) {
                        console.log('Placing Order...')

                        var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - amount) + ' WHERE item_id = ' + item;

                        connection.query(updateQueryStr, function(err, data) {
                            if (err) throw err;

                            console.log("Your order has been placed! Your total is $" + productData.price * amount);
                            console.log("\n---------------------------------------------------------------------\n");

                            shopAgain();
                        })
                    } else {
                        console.log("We're sorry, there is not enough stock to fulfill your order at this time.");
                        console.log("Please try again.");
                        console.log("\n---------------------------------------------------------------------\n");

                        runBamazon();
                    }
                }
            })
        })
}