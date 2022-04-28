const express = require('express')
const app = express()
const port = 3000
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "4827dc5420935ca32d547eb05dd6ce51&units=metric";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey + "&units=" + unit;
  https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
          const weatherData = JSON.parse(data)
          const icon = weatherData.weather[0].icon
          const temp = weatherData.main.temp
          const description = weatherData.weather[0].description
          const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png" // Import API Image
          res.write("<p>the weather is currently " + description +"</p>");//menggunakan write agar bisa send lebih dari 1
          res.write("<h1>the temperatur in " + query + " is " + temp +" degrees celcius</h1>");
          res.write("<img src="+ imageURL +">");
          res.send(); //hanya bisa mengirim 1 perintah saja
      })
  })


})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
