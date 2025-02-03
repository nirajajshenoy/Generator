//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

var userIsAuthorised = false;
function passwordCheck(req, res, next) {
    const password = req.body["password"];
    if (password === "ILoveProgramming") {
      userIsAuthorised = true;
    }
    next();
  }
  app.use(passwordCheck);
app.use("/general", express.static(path.join(__dirname, "")));
app.use(express.static(path.join(__dirname, "general")));
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/general/index.html");
  });
  
  app.post("/check", (req, res) => {
    if (userIsAuthorised) {
      res.sendFile(__dirname + "/general/welcome.html");
    } else {
      res.sendFile(__dirname + "/general/not.html");
      //Alternatively res.redirect("/");
    }
  });

app.listen(port, () => {
    console.log("server listening on port 3000");
})