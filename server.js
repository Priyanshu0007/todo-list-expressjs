const express= require('express');
const https = require('https');
const bodyParser=require("body-parser");
const app=express();
var items=[];
var workItems=[];

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  var today=new Date();
  var opetion={
    weekday:"long",
    day:"numeric",
    month:"long",
  };
  var day=today.toLocaleString("en-US",opetion);
  res.render("list",{
    listTitle:day,
    newListItems:items
  });
  });
app.get("/work",function(req,res){
    res.render("list",{
      listTitle: "Work List",
      newListItems: workItems
    });
  });
app.post("/",function(req,res){
    let item=req.body.newItem;
    if (req.body.button==="Work") {
      workItems.push(item);
      res.redirect("/work");
    }else{
      items.push(item);
      res.redirect("/");
    }
  });

app.listen(3000,function(){
  console.log("started...");
});
