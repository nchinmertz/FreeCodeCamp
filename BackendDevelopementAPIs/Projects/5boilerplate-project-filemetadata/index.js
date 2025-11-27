var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();
var multer = require('multer');
var infile = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/", infile.single("upfile"), (req, res, err)=>{
  if(err){
    return res.json({"error":err})
  }
  res.json({"name":req.file.fieldname, "type":req.file.mimetype, "size":req.file.size })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
