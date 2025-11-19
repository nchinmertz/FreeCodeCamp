require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nchinmertz:Splashdown3542@cluster0.3kwfrlw.mongodb.net/?appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const taylorSwift = new Person({name:"Taylor Swift", age:34, favoriteFoods:["chicken nuggets", "ranch", "ketchup"]});
  taylorSwift.save(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {name:"Keith Habersberger", age:38, favoriteFoods:["fried chicken", "steak"]},
  {name:"Zach Kornfeld", age:35, favoriteFoods:["peppers", "milk"]},
  {name:"Eugene Lee Yang", age:39, favoriteFoods:["coffee"]}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people)=>{
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err, people)=>{
    if (err) return console.log(err);
    done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, people)=>{
    if (err) return console.log(err);
    done(null, people);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err, people)=>{
    if (err) return console.log(err);
    done(null, people);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
