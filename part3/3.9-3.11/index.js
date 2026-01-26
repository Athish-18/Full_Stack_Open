const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

/* ------------------ DATA ------------------ */

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

/* ------------------ UTILS ------------------ */

const generateid = () => String(Math.floor(Math.random() * 100000));

/* ------------------ MIDDLEWARE ------------------ */

app.use(express.json());

// Morgan logging
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

/* ------------------ STATIC FRONTEND (3.11) ------------------ */

// Serve frontend build
app.use(express.static(path.join(__dirname, "dist")));

/* ------------------ API ROUTES ------------------ */

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === req.params.id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter((p) => p.id !== req.params.id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // Validation (3.10)
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }

  const nameExists = persons.some(
    (p) => p.name.toLowerCase() === body.name.toLowerCase(),
  );

  if (nameExists) {
    return res.status(400).json({
      error: "name must be unique",
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

/* ------------------ SPA FALLBACK (IMPORTANT FOR REACT ROUTING) ------------------ */

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

/* ------------------ SERVER ------------------ */

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
