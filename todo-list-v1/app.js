const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")

var items = ["buy food", "Cook food"];

app.set('view engine', 'ejs'); // diambil dari https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {

  var today = new Date();
  var options ={
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);

//   var currentDay = today.getDay();
//   var day = "";
//
// switch (currentDay) {
//   case 0:
//   day = "Sunday";
//   break;
//   case 1:
//   day = "Monday";
//   break;
//   case 2:
//   day = "Tuesday";
//   break;
//   case 3:
//   day = "Wednesday";
//   break;
//   case 4:
//   day = "Thursday";
//   break;
//   case 5:
//   day = "Friday";
//   break;
//   case 6:
//   day = "Saturday";
//   break;
//   default:
// console.log("error: current day is equal to" + currentDay);
// }
  // if(currentDay === 6 || currentDay === 0){
  //   day = "Weekend";
  //   // res.sendFile(__dirname +"/weekend.html") //karna sudah menggunaka ejs kita ganti
  //   // res.render("list", {kindOfDay: day});
  // }else{
  //   day = "Weekday";
  //   // res.sendFile(__dirname +"/weekday.html")
  //   // res.render("list", {kindOfDay: day});
  //}

    res.render("list", { //dari lists.ejs
      kindOfDay: day,
      newListItems: items

    });//atau bisa juga taruh disini

});

app.post("/", function(req,res){
  var item = req.body.newItem;
  items.push(item);
  res.redirect("/"); //redirect mengirim data lagi ke home "/"
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})
