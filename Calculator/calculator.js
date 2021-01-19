const express = require('express');
const bodyParser = require('body-parser'); //incorporated body-parser in our project

const app = express();
app.use(bodyParser.urlencoded({ extended: true })) //extended:true allows us to post nested objects, body parser explicitly requires us to declare it
    //whenever you want to grab info that gets posted to your server from the html form, your gonna use ".urlencoded"
    //body parser works with express so we can directly say app.use 

const port = 3000;

app.get("/bmicalculator", (_req, res) => { res.sendFile(__dirname + "/bmiCalculator.html") });
app.get("/", (_req, res) => { res.sendFile(__dirname + "/index.html"); });

app.post("/bmicalculator", (req, res) => {
    var height = parseFloat(req.body.height);
    var weight = parseFloat(req.body.weight);

    var result = weight / (height * height);
    res.send("Your BMI is : " + result);
});
app.post("/", (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send("The result of the addition is : " + result);
});

app.listen(port);