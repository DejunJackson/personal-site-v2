//Require installed packages
const express = require("express");
const request = require('request');
const port = process.env.PORT || 3000;
const path = require('path')


//use express to create app constant
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public'))); 
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
  const account = process.env.ACC
  const options = {
    url: 'https://api.github.com/users/DejunJackson/events/public',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'Basic' + account
    }
  };

  var recentactivity = []
  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);

      for (i=0; i<info.length;i++){
        new_date = info[i].created_at.slice(0, 10)
        recentactivity[i] = {
          "type" : info[i].type,
          "repo" : info[i].repo.name,
          "date" : new_date,
          "ref": info[i].payload.ref
      }
    }

    res.render('recent_activity', {
      recentactivity:recentactivity
    })

  }
  else{
    console.log(error);
  }
}
request(options, callback);
});

app.get("/contact", function(req, res){
  res.render('contact');
});

app.get("/story", function(req, res){
  res.render('story');
});
//listen on port 3000
app.listen(port, function(){
  console.log("Server started on port 3000");
});
