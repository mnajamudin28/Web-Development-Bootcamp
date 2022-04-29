const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const request = require("request");
const https = require('https');

app.use(express.static("public")); // menaruh file css dan image di dalam folder public yang sudah dibuat sebelum menggunakan server node js
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
})


app.post('/', function(req,res){
  var firstName = req.body.fName; // npm body-parser
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/a2168b825a";

  const options = {
    method: "POST",
    auth: "moe:6c9647ac7d2302e9009b92a71239d300-us14"
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname +"/succes.html");
    }else{
      res.sendFile(__dirname +"/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})

app.post("/failure", function(req, res){
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){ //process.env.PORT (agar heroku bisa deteksi port yang sedang dijalankan)
  console.log("Example app listening on port");
})
// API Key https://us14.admin.mailchimp.com/account/api/
// 6c9647ac7d2302e9009b92a71239d300-us14

// list ID
// a2168b825a
