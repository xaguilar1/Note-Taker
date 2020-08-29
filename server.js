
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
        myDB = JSON.parse(data)
        noteID = uniqid() 
        userNotes = req.body 
        userNotes.id = noteID ;
        myDB.push(userNotes)
    
  
        fs.writeFile("./db/db.json", JSON.stringify(myDB), (err) => { // write new file containing the new incoming note
          if (err) { throw err };
          console.log("successfully added new note")
          console.log(myDB)
          res.json(myDB);
        })
      })
});

app.delete("/api/notes/:id", function (req, res) {
    const requestId = req.params.id;
    fs.readFile("./db/db.json", (err, data) => { 
      if (err) { throw err };
      const oldNotes = JSON.parse(data) 
      const newNotes = oldNotes.filter((note)=> {return note.id !== requestId}) 
      fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => { 
        if (err) { throw err };
        res.send(newNotes);
        console.log("Deleted Notes!!!")
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

