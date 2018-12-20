var express = require("express");

var app = express();
app.get("/", function(req, res){
   // res.render("tran trung huynh");
    res.render();
})

app.listen(9000, function(){
    console.log("app running in port 9000");
})