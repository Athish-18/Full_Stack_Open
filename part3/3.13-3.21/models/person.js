const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

const regex = /^\d{3}-\d{7}$/;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("error is", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  number: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true,
    // custom validator
    validate: {
      validator: function (value) {
        return regex.test(value); // returns true if valid phone number
      },
      message:
        "{VALUE} is not a valid phone number! Phone number must be in the format XXX-XXXXXXX", // error message that mongoose will return if validation fails
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
