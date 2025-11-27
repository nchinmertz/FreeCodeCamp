require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const URL = require('url').URL;
const app = express();

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
const { doesNotMatch } = require('assert');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const urlSchema = new Schema({
  original_url: { type: String, required: true },
  short_url: Number,
});
const url = mongoose.model("URL", urlSchema);

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {

  const inputURL = req.body.url;
  const urlObject = new URL(inputURL);

  dns.lookup(urlObject.hostname, (err, address, family) => {
    if (err) {
      res.json({ error: 'invalid url' });
    } else {
      var short_num = Math.floor(Math.random() * 100000).toString();

      var data = new url({
        original_url: inputURL,
        short_url: short_num
      });

      data.save(function(err, data) {
        if (err) {return console.error(err);}
      });

      res.json({
        original_url: inputURL,
        short_url: short_num
      })
    };
  });
});

app.get("/api/shorturl/:input", (req, res)=>{
  let info = req.params.input;
  url.findOne({short_url:info}, (err, ret)=>{
    if(!err && ret){
      res.redirect(ret.original_url);
    }else{
      res.json({ error: 'invalid url' })
    }
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
