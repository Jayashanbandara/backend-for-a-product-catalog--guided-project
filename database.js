const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to the SQLite Database");

        db.run(`CREATE TABLE IF NOT EXISTS customers(
            customerid INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            email TEXT,
            dataOfBirth TEXT,
            gender TEXT,
            age TEXT,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timeStamp TEXT
        )`, (err) => {
            if (err) {
                console.error(err.message);
                
            } else {
                
                console.log("Table 'customers' created or already exists");

                const insert = 'INSERT INTO customers(name,address,email,dataOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
                db.run(insert, ["A.D.Lakith Dhrmasiri", "No 324/A Ra De Mel Road,colombo", "lakith@gmail.com", "1991.02.25", "female", "28", "A.D.L.Dharmasiri", "102445217895", "12/2022", "246", "2022-12-31 23:59:59"]);
            }
        });
    }
});

module.exports = db;
