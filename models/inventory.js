var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Warehouse_db'
});

// displays inventory from DB, then starts nested function calls
function displayInventory() {
    connection.query('SELECT itemID, ProductName, Price FROM products', function(err, rows, fields) {
        if (err) throw err;
        console.log('Available Products: ');
        for (var i = 0;i < rows.length; i++) {
            console.log('Item ID: ' + rows[i].itemID + ' Product Name: ' + rows[i].ProductName + ' Price: $' + rows[i].Price)
        }
        });
    };

        function processOrder(id, quantity){
        connection.query('SELECT StockQuantity FROM products WHERE ItemID = ?', [id], function(err, rows, fields){
            if(err) throw err;

            if(JSON.parse(rows[0].StockQuantity) >= quantity){
                var adjustQuantity = rows[0].StockQuantity - quantity;
                getPrice(id, quantity);
                updateQuantity(adjustQuantity, id);
            } else {
                console.log('Not enough stock to fulfill request, please try again');
                connection.end();
            }
        });
    }

    function getPrice(id, quantity){
        connection.query('SELECT Price FROM products WHERE ItemID = ?', [id], function(err, rows, fields){
            if(err) throw err;
            var priceOfOrder = JSON.parse(rows[0].Price) * quantity;
            console.log('The total cost of your order is: $' + priceOfOrder);
            connection.end();
        });
    }
    function updateQuantity(adjustQuantity, id){
        connection.query('UPDATE products SET StockQuanity = ? WHERE itemID = ?', [adjustQuantity, id], function(err, rows, fields){
            if(err) throw err;
            console.log('Inventory Updated');
            connection.end();
        });
    }

    displayInventory();
