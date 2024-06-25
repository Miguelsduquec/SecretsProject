//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url)); //import full path from PC directory

const app = express();
const port = 3000;
var password = "ILoveProgramming";
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended:true}));

function passwordcheck(req,res,next){
    if (req.body["password"] == password)
        {
            userIsAuthorised=true    
        }
        next()
}

app.use(passwordcheck);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    console.log(req.body);

    if (userIsAuthorised)
    {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else
    {
        res.sendFile(__dirname + "/public/index.html");
        // $(h1).html("<em>Secrets. Wrong password.</em>")
    //  res.send(`<h1>Following password not correct: </h1><h2>${req.body["password"]}</h2>`); // use html + function result
    } 
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  