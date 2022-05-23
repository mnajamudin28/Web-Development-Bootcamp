//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true}); // conect ke database wikiDB yang sudah dibuat pake studio mongo 3T

const articlesSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articlesSchema);


// kodingan ini untuk mengisi REST API di postman input data di robo 3T / postman sendiri

//TODO
// REQUEST TARGETING ALL ARTICLES
//app.route untuk memanggil semua model dalam 1 function route
app.route("/articles")

.get(function (req, res) { //menampilkan data di web browser
    Article.find(function (err, foundArticles) {
        if (!err) { //jika tidak error kirim foundArticles
            res.send(foundArticles);
        } else {
            res.send(err);
        }
    })
})

.post(function (req, res) {//meminta data dari client

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    newArticle.save(function (err) {//menyimpan data setelah schema di isi
        if (!err) {
            res.send("succesfully ad new articles"); //mengirim pesan ke postman atau web browser
        } else {
            res.send(err);
        }
    });
})

.delete(function (req, res) {
    Article.deleteMany(function (err) {
        if (!err) {
            res.send("succesfully deleted all articles")
        } else {
            res.send(err)
        }
    });
});

// request targeting spesific articles

app.route("/articles/:articleTitle")

// req.params.articleTitle = "jQuery"

.get(function(req, res){

    Article.findOne({title: req.params.articleTitle}, function(err, foundArticles){
        if(foundArticles){
            res.send(foundArticles);
        }else{
            res.send("No articles matching that title was found");
        }
    })
})

.put(function(req,res){ // untuk update atau merubah title or content
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite:true},
        function(err){
            if(!err){
                res.send("succesfully updated article");
            }
        }
    )
})

.patch(function(req,res){
    Article.update(
        {title: req.params.articleTitle},
        {$set:req.body},
        function(err){
            if(!err){
                res.send("Succesfully upadted articles");
            }else{
                res.send(err)
            }
        }
    )
})

.delete(function(req,res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Succesfully deleted article")
            }else{
                res.send(err)
            }
        }
    )
});

// app.get("/articles", function(req,res){ //menampilkan data di web browser
//     Article.find(function(err, foundArticles){
//         if(!err){ //jika tidak error kirim foundArticles
//             res.send(foundArticles);
//         }else{
//             res.send(err);
//         }  
//     })
// })

// app.post("/articles", function(req,res){//meminta data dari client

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     })

//     newArticle.save(function(err){
//         if(!err){
//             res.send("succesfully ad new articles"); //mengirim pesan ke postman atau web browser
//         }else{
//             res.send(err);
//         }
//     });
// })

// app.delete("/articles", function(req, res){
//     Article.deleteMany(function(err){
//         if(!err){
//             res.send("succesfully deleted all articles")
//         }else{
//             res.send(err)
//         }
//     });
// });


app.listen(3000, function () {
    console.log("Server started on port 3000");
});