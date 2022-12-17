const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

//console.log(date());

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set("view engine", "ejs");
const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];

app.get("/", function (req, res) {
let day = date.getDate();
  res.render("list", { listTitle: day, newListItem : items });
});

app.post("/",function(req,res){
 let item = req.body.newItem;
 //console.log(req.body)
 if(req.body.list === "Work")
 {
  workItems.push(item);
  res.redirect("/work")
 }
 else{
  items.push(item)
  res.redirect("/");
 }

});

app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List",newListItem : workItems});
})

app.post("/work",function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work")
  console.log()
})

app.get("/about",function(req,res){
  res.render("about")
})

app.listen(3000, function () {
  console.log("Run on 3000");
});
