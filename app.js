//Require installed packages
const express = require("express");


//use express to create app constant
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
//what is sent when home routes is accessed
app.get("/", function(req, res){
  res.render('home');
});

app.get("/skills", function(req, res){
  res.render('skills');
});

app.get("/projects", function(req, res){
  res.render('projects');
});

app.get("/recentactivity", function(req, res){
  res.render('recent_activity');
});

app.get("/contact", function(req, res){
  res.render('contact');
});

app.get("/story", function(req, res){
  res.render('story');
});
//listen on port 3000
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
