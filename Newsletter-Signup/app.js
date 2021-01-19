const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public")); //this line takes path of the folder which consists of static local files which we want to use in our Newsletter
//if you don't have these files then you can't use your static files in any app that is on your express server

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/success.html");
})

app.get("/failure", (req, res) => {
    res.sendFile(__dirname + "/failure.html");
})

app.post("/", (req, res) => {
    const firstName = req.body.fName; //fetching the data which subscribers entered while signing up
    const lastName = req.body.lName;
    const eMail = req.body.emails;

    const data = {
        members: [ //our data is gonna be sent through body parameters using "members" which is an array of objects consisting of email, status of the members we wanna subscribe to, we are only gonna subscribe one person at a time so we have only one "member array of object"
            {
                email_address: eMail,
                status: "subscribed", //subscribed is the Subscriber's current status, status key has "unsubscribed","cleaned","pending" values
                merge_fields: { //an object which consists of fields like first and last name, address, phone no. of the subscriber
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data); //turn the above data into string that is in the form of json and this is we are going to send to mailchimp

    const url = "https://us7.api.mailchimp.com/3.0/lists/d0e02212e0"; //"us7" is from the last of api key 
    //for posting we must have url like "POST(chimpApi)/lists(it says that your subscribers list will start from here)/listID(as we can have many list for putting our subscribrs into)"

    const options = {
        method: "POST", //most important option which will specify if we want "POST" or "GET"
        auth: "shubham1:7714baa072fe10aa64ae413a80681378-us7", //auth is the for authetication and it's from the https nodejs docs
    }

    const request = https.request(url, options, (response) => { //"response" from the mailchimp server //https is from the nodejs docs for requesting POST on mailchimp
        //we'll make a https request and when we get response then we are going to check that data and console.log that data

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data) => { //here the mailchimp will response with the data that subscriber entered while signing up to our newsletter and will say that new member has been created
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData); //writing the jsonData which consists of the fnam,lname,email,status of the subscribers
    request.end(); //to end the request

});

//the post request which we triggered in the failure.html is going to be called by our server over here and redirect it to the signup page which has "/"i.e. root route
app.post("/failure", (_req, res) => { //failure route that's making a post request
    res.redirect("/"); //in the above "app.get("/")" section the root route will send the signup.html file in return
})


const port = 3000;
app.listen(process.env.PORT || port, () => { console.log(`Server is running on port ${port}`) }); //process.env.PORT means heroku will choose the port bby themselves

// api key
// 7714baa072fe10aa64ae413a80681378-us7  //at last we have us7 which is the US server no.7 which randomly appointed to us

// list ID
// d0e02212e0 //this is gonna help mailchimp identify the list your gonna put your subscribers into

//Heroku
//After deployong your app on heroku, if you made changes then to apply those changes you have to run the following commands:
//git add .  //to add the files
//git commit -m "Changes made"  //commit the file on git
//git push heroku master  //this will update the website with the changes we have made