# Bamazon Node App

## Overview

This app is an Amazon-like storefront created using the SQL database, javascript, JSON packages and Node. The app will take in orders from customers and deplete stock from the store's inventory.

## Submission

Along with the .js file, a .sql file was created to show the work that was done in MySQL Workbench, as well as a CSV file that contains all the original inventory data. The CSV file was imported directly into the SQL database via MySQL Workbench.

Also included is a walkthrough video that shows the app's functionality in these steps:

* User starts app
* A list of the inventory appears along with the data:
  * Item ID
  * Product Name
  * Department
  * Price
  * Quantity in Stock
 
 * The user also has a prompt (made with the inquirer package) asking them to enter the item ID of what they would like to purchase
 * The user tries to buy too many of the first item, and is met with an error message and is asked to try again
 * The user buys multiple of another item. They are shown the total price, along with a confirmation message of purchase.
 * As an added feature, the user is asked if they would like to buy more (YES or NO).
 * The user selects "YES" and the inventory list is refreshed, with new quantities displayed. Note that the previous order is taken out.
 * The user buys multiple of another item. They are shown the total price, along with a confirmation message of purchase.
 * The user is asked if they would like to buy more (YES or NO).
 * The user selects "NO" and a Goodbye message appears, along with the end of the connection to the server.

- - -
