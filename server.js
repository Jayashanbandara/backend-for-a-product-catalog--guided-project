const express = require("express");
const app = express();
const db = require("./database.js");
const bodyParser = require("body-parser");
const validator = require("validator");
const cardValidator = require("card-validator");

app.use(bodyParser.json());

const HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log(`Server is running on port ${HTTP_PORT}`);
});


function isValidEmail(email) {
    return validator.isEmail(email);
}


function isValidCreditCard(cardNumber) {
    const cardInfo = cardValidator.number(cardNumber);
    return cardInfo.isValid;
}

app.post("/api/customers/", (req, res, next) => {
    try {
        const errors = [];

        if (!req.body) {
            errors.push("An invalid input");
            res.status(400).json({ "error": "Bad Request", "message": "Invalid input" });
            return;
        }

        const {
            name,
            address,
            email,
            dataOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        } = req.body;


        if (!isValidEmail(email)) {
            errors.push("Invalid email address");
        }

        if (!isValidCreditCard(cardNumber)) {
            errors.push("Invalid credit card number");
        }

        if (errors.length > 0) {
            res.status(400).json({ "error": "Bad Request", "message": errors.join(", ") });
            return;
        }

        const sql =
            "INSERT INTO customers(name,address,email,dataOfBirth,gender,age,cardHolderName,cardNumber,expiryDate,cvv,timeStamp) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
        const params = [
            name,
            address,
            email,
            dataOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timeStamp
        ];

        db.run(sql, params, function (err, result) {
            if (err) {
                console.error(err.message);
                res.status(400).json({ "error": "Bad Request", "message": err.message });
                return;
            } else {
                res.status(201).json({
                    "message": `Customer ${name} has been created`,
                    "customerId": this.lastID,
                });
            }
        });
    } catch (E) {
        console.error(E);
        res.status(500).send("Internal Server Error");
    }
});
