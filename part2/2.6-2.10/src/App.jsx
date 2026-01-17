import { useState } from "react";
import Form from "./Form.jsx";
import Person from "./Person.jsx";
import Filter from "./Filter.jsx";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phn: "040-123456", id: 1 },
    { name: "Ada Lovelace", phn: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phn: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phn: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findUser, setUser] = useState("");

  // 🔹 derived data (NOT inside handlers)
  const personsToShow =
    findUser === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(findUser.toLowerCase()),
        );

  const handleSubmit = (event) => {
    event.preventDefault();

    const exists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (exists) {
      alert(`${newName} is already in the phoneBook`);
    } else {
      const copyPerson = {
        name: newName,
        phn: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(copyPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const findPerson = (event) => {
    setUser(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <h4>Filter shown with</h4>
      {/* <input value={findUser} onChange={findPerson} /> */}
      <Filter findUser={findUser} findPerson={findPerson}></Filter>

      <h3>Add a new</h3>
      {/* <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}
      <Form handleSubmit={handleSubmit} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}></Form>

      <h2>Numbers</h2>
      {/* <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.phn}
          </li>
        ))}
      </ul> */}
      <Person personsToShow={personsToShow}></Person>
    </div>
  );
};

export default App;


// const App = () => {
//   // ...

//   return (
//     <div>
//       <h2>Phonebook</h2>

//       <Filter ... />

//       <h3>Add a new</h3>

//       <PersonForm 
//         ...
//       />

//       <h3>Numbers</h3>

//       <Persons ... />
//     </div>
//   )
// }