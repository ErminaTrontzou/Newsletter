const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https")


const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res) {
    res.sendFile(__dirname+ "/signup.html");
})

app.post("/", function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/24e49206aa";
    const options = {
        method: "POST",
        auth: "ermina:22359c24787987ad8f838003e5c181f5-us13"
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname +"/success.html");
        }else if(response.statusCode===404){
            res.sendFile(__dirname+"/dailure.hmtl");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })


    request.write(jsonData);
    request.end();
});

app.post("/failute",function (req,res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running")
});



//22359c24787987ad8f838003e5c181f5-us13
//24e49206aa