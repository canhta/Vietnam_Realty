var express = require("express");

var app = express();
app.set('view engine', 'ejs');  
app.set('views','./views');
app.use(express.static('public'));


app.get("/", function(req, res){
   // res.render("tran trung huynh");
    res.render('test');
})

app.listen(9000, function(){
    console.log("app running in port 9000");
})