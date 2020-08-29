
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const uniqid = require('uniqid');
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(PORT, () => {
    console.log("listeing on port: " + PORT);
})


app.use(express.static(path.join(__dirname, '/public')));
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });

app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", (err, data) => { 
        if (err) { throw err };
        currentDatabase = JSON.parse(data)
        uniqueId = uniqid() 
        newRequest = req.body 
        newRequest.id = uniqueId ;
        currentDatabase.push(newRequest)
    
  
        fs.writeFile("./db/db.json", JSON.stringify(currentDatabase), (err) => { // write new file containing the new incoming note
          if (err) { throw err };
          console.log("successfully added new note")
          console.log(currentDatabase)
          res.json(currentDatabase);
        })
      })
});

app.delete("/api/notes/:id", function (req, res) {
    const requestId = req.params.id;
    fs.readFile("./db/db.json", (err, data) => { 
      if (err) { throw err };
      const currentArray = JSON.parse(data) 
      const newArray = currentArray.filter((note)=> {return note.id !== requestId}) 
      fs.writeFile("./db/db.json", JSON.stringify(newArray), (err) => { 
        if (err) { throw err };
        res.send(newArray);
        console.log("successfully deleted note")
            })
    })
  });


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

















