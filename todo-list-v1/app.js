const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); //diambil dari module yang kita buat dengan nama date.js

// console.log(date());

const items = ["buy food", "Cook food"];
const workItems = [];

app.set('view engine', 'ejs'); // diambil dari https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));//agar file css bisa run ubah menjadi static

app.get('/', (req, res) => {

const day = date.getDate();

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
      listTitle: day,
      newListItems: items
    });

});

app.post("/", function(req,res){
  const item = req.body.newItem;
console.log(req.body);
  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/"); //redirect mengirim data lagi ke home "/"
  }


});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
});
