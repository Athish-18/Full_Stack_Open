const morgan = require("morgan");
const express = require("express");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateid = () => {
  return String(Math.floor(Math.random() * 10000));
};

app.use(express.json()); //middleware to parse json body --convert to js object

//morgan middleware for logging

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(morgan("tiny"));

app.get("/", (request, response) => {
  response.send("<h1>I m working </h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons); //response with json format
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people <p>
                 <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
    console.log("logged");
  } else {
    response.status(404).end();
    console.log("error logged");
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // if(!body.name || !body.number)
  // {
  //   return res.status(400).json({
  //       error:"name missing",
  //   })
  // }

  const name = body.name; //
  if (persons.find((p) => p.name == name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "details missing",
    });
  }

  const person = {
    id: generateid(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
