require("dotenv").config();
const express = require("express");
const Person = require("./models/person");

const app = express();

/* ---------- MIDDLEWARE ---------- */

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);
app.use(express.static("dist"));

/* ---------- ROUTES ---------- */

/* GET all persons */
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  })
  .catch(error=>next(error));
});

/* GET one person */
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/info",(req,res,next)=>{
  Person.countDocuments({}).then(count=>{
    res.send(`<p>Phonebook has info for ${count} people </p>
      <p>${new Date()}</p>`);
  })
  .catch(error=>next(error));
})


/* ADD a person */
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

/* DELETE a person */
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id",(request,response,next)=>
{
  const body=request.body;

  const person={
    name:body.name,
    number:body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

/* ---------- UNKNOWN ENDPOINT ---------- */

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

/* ---------- ERROR HANDLER (LAST) ---------- */

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

/* ---------- SERVER ---------- */

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
