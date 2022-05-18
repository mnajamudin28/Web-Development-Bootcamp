const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require ("lodash");
//(deleted) const date = require(__dirname + "/date.js"); //diambil dari module yang kita buat dengan nama date.js

app.set('view engine', 'ejs'); // diambil dari https://github.com/mde/ejs/wiki/Using-EJS-with-Express
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));//agar file css bisa run ubah menjadi static

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true}); // menghubungkan ke server mongodb

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);//gunakan .model agar bisa menggunakan fitur model pada mongoose

const item1 = new Item({ 
  name:"welcome to your todo list"
});

const item2 = new Item({
  name: "hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get('/', (req, res) => {

// const day = date.getDate(); (delete)
  Item.find({}, function(err, foundItems){ //memeriksa array dari const defaultItem
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("succesfully save default items to DB");
        }
      });
      res.redirect("/");
    }else{
      res.render("list", { listTitle: "Today", newListItems: foundItems });//dari lists.ejs//founditem parameter baru dibuat disini
    };
    
  })
  
});



app.get("/:customListName", function(req,res){ //custom url membuat url di web browser
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){ // foundlist parameter baru dibuat disini
    if(!err){ 
      if(!foundList){
        //create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });

        list.save();
        res.redirect("/" + customListName);
      }else{
        // show an existing list

        res.render("list", { listTitle: foundList.name, newListItems: foundList.items }); 
      }
    }
  });

});

app.post("/", function(req,res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({ //untuk input data ke mongoDB
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");//menampilkan input data mongoDB ke homepgae
  }else{
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+ listName);
    });
  }
  
// console.log(req.body);
//   if(req.body.list === "Work"){
//     workItems.push(item);
//     res.redirect("/work");
//   }else{
//     items.push(item);
//     res.redirect("/"); //redirect mengirim data lagi ke home "/"
//   }

});

app.post("/delete", function(req,res){
  const checkedItemId = req.body.checkbox; //req.body meminta dari semua body di list.ejs
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checkedItemId, function (err) { //menghapus item dengan mencari ID
      if (!err) {
        console.log("Succesfully deleted checked item.");
        res.redirect("/");
      }
    });
  }else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}} , function(err, foundList){
      if (!err){
        res.redirect("/" + listName);
      }
    });
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
