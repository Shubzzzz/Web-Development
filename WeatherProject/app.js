//Steps : 1.require the express and import express modules and save it in var app(everything same as before
//2.create port and listen to it
//3.require https module so that you can use it's function
//4.get the data from the specified api using https.get() but it'll be in hex format
//5.parse the json data i.e. convert the data into objects
//6.fetching the items that we want from that data and displaying


const express = require('express');
const https = require('https'); //https is already there in node modules so no need to install it separatelys
const bodyParser = require('body-parser'); //inorder to parse something from the web to our program we have to use the body-parser

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })) //whenever you want to grab the info that gets posted to your server from html form

app.get("/", (req, res) => { //"res" refers to the response that we'll give to the browser site to display
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const city = req.body.cityName; //grabbing name=cityName in our html document
    const apiKey = "64749dd427459b9c563c656d8ae3b9b2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, (response) => { //"response" refers to the response from the openWeather site
        // console.log(response.statusCode); //getting the response from the specified url usisng native https across the internet
        //this https module allows node.js to transfer data over the Hyper Text Transfer Protocol

        response.on("data", (data) => { //we tap into the "response" and use "on" method
            console.log(data); //in this step you'll get data in the hexdec format which you can convert using .parse or .stringify
            //so it means when we receive some "data" in the response then perform the callback function(data)  

            const weatherData = JSON.parse(data); //convert the hex data response received from the url into the object fromat
            // console.log(weatherData);

            const Temp = weatherData.main.temp; //getting temperature data from the weatherData which consists of the parsed json data
            console.log(Temp);
            const weatherDescription = weatherData.weather[0].description; //weather is actually an array of objects in the json data that we got from the api so it's, weather[0].description;
            console.log(weatherDescription);
            const Icon = weatherData.weather[0].icon; //you grab the icon value from the weatherData object 
            const iconUrl = "https://openweathermap.org/img/wn/" + Icon + "@2x.png"; //attach that icon value to url and store in a variable

            res.write("<h1>The weather is currently " + weatherDescription + "</h1>");
            res.write("<h2>The Temperature in " + city + " is <em>" + Temp + " C</em></h2>");
            res.write("<img src=" + iconUrl + ">"); //use that url in the html <img> tag to get the actual image
            res.send(); //send all the written data for posting on the net


            // const object = {
            //     name: "Shubham",
            //     favouriteFood: "Biryani"
            // }

            // console.log(JSON.stringify(object)); //converts the object into the string

        });
    });
})

app.listen(port, () => { console.log(`Server started at port ${port}`) });


//Status code : 200 = OK, 404 = Not Found, 401 = Unauthorized(your api key is wrong)