const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
  userId: String
});

const userSchema = new Schema({
    username: String,
})
const Exercise = mongoose.model("Exercise", exerciseSchema);
const User = mongoose.model("User", userSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", (req, res)=>{
  const newUsername = req.body.username;
  const newUser = new User({username:newUsername});
  newUser.save((err, user)=>{
    if (err) {
      console.error(err);
      res.json({message:"Failed User Creation"});
    };
    res.json({username:user.username, _id:user._id});
  });
});

app.get("/api/users", (req, res)=>{
  User.find({}, (err, users)=>{
    if(err){
      console.log(err);
      res.json({message:"Getting all users failed"});
    }
    if(users.length===0){
      res.json({message:"No users in this database"});
    }
    res.json(users);
  });
});

app.post("/api/users/:_id/exercises", (req, res)=>{
  const userId = req.params._id;
  const description = req.body.description;
  const duration = req.body.duration;
  let date = req.body.date;
  if (!date){
    date = new Date().toISOString().substring(0, 10);
  }
  User.findById({_id:userId}, (err, user)=>{
    if(err){
      res.json({message: "No User foudn with id: "+userId});
    }
    const newExercise = new Exercise({username: user.username, 
      description: description, duration: duration, date: date, userId:user._id});
    newExercise.save((err, exercise)=>{
      if(err){
        res.json({message:"Exercise Creation Failed"});
      }
      res.json({username: user.username, 
        description: exercise.description, 
        duration: exercise.duration, 
        date: new Date(exercise.date).toDateString(), 
        _id:user._id
      });
    });
  });
});

app.get("/api/users/:_id/logs", async (req, res)=>{
  const userId = req.params._id;
  const from = req.query.from || new Date(0).toISOString().substring(0, 10);
  const to = req.query.to || new Date(Date.now()).toISOString().substring(0, 10);
  const limit = Number(req.query.limit) || 0;
  let user = User.findById(userId);
  let exercises = await Exercise.find({userId: userId, date: { $gte: from, $lte: to }}).select('description duration date').limit(limit).exec();
  let exerciseLogs = exercises.map((exercise)=>{
    return {
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString()
    }
  });
  res.json({username:user.username, 
    count:exerciseLogs.length, 
    _id:user._id,
    log:exerciseLogs
  });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
