const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://cathishk:${password}@strawhats.ra8ei.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// CASE 1: list all people
if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((p) => {
      console.log(p.name, p.number);
    });
    mongoose.connection.close(); //// shld be inside .find else it will close before finding since finding could take time
  });
  return; // ⬅️ VERY IMPORTANT
}

// CASE 2: add a new person
const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then(() => {
  console.log(`added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});
