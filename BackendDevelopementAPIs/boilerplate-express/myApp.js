require('dotenv').config();
let express = require('express');
const res = require('express/lib/response');
let app = express();
let bodyParser = require("body-parser");
console.log("Hello World");

/*
app.get('/', function(req, res) {
  res.send('Hello Express');
});

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", (req, res)=>{
    let mes = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        mes = "HELLO JSON";
    }
    res.json({"message":mes})
})

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});


app.get("/now", (req, res, next)=>{
    req.time = new Date().toString();
    next();
    }, 
    (req, res)=>{
        res.send({time:req.time});
    }
);

app.get("/:word/echo", (req, res)=>{
    const {word} = req.params;
    res.json({
        echo:word
    });
});

app.get("/name", (req, res)=>{
    var { first: firstName, last: lastName } = req.query;
    res.json({
        name: `${firstName} ${lastName}`
    });
});
*/
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", (req, res)=>{
    res.json({
        name: req.body.first + " " + req.body.last
    });
})

















 module.exports = app;
