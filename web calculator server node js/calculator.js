// Make a new folder called Calculator on your Desktop
// Change Directory to this new folder
// Inside the Calculator folder, create a new file called calculator.js
// Set up a new NPM package
// Open the project folder in Atom
// Using NPM install the express module
// Require express in your calculator.js
// Setup express
// Create a root route get method with app.get()
// Send the words Hello World from the root route as the response
// Spin up our server on port 3000 with app.listen
// Run server with nodemon

const express = require('express')
const bodyParser = require('body-parser') //npm bodyparser
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended: true}));//menggunakan npm bodyparser app.use()

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post('/', function (req, res) {
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);

  var result = num1 + num2;
  res.send('The result of the calculator ' + result);
})

app.get('/bmicalculator', (req, res) => {
  res.sendFile(__dirname + "/bmicalCulator.html")
})

app.post('/bmicalculator', function(req, res){
  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  var bmi = weight / (height * height);

  res.send('Your BMI is ' + bmi);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
