import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";
import Notification from "./components/Notification.jsx";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findUser, setUser] = useState("");
  const [NotificationMessage, setNotificationMessage] = useState(null);

  // Fetching data from server
  // useEffect(() => {
  //   axios.get("http://localhost:3001/persons").then((response) => {
  //     setPersons(response.data);
  //   });
  // }, []);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  // 🔹 derived data (NOT inside handlers)
  const personsToShow =
    findUser === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(findUser.toLowerCase()),
        );

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existingPerson) {
      const ok = window.confirm(
        `${existingPerson.name} is already added, replace the old number with a new one?`,
      );

      if (ok) {
        const updatedPerson = {
          ...existingPerson,
          phn: newNumber,
        };

        noteService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson,
              ),
            );
            setNewName("");
            setNewNumber("");
            setNotificationMessage(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(error => {
            console.log("Error updating the person");
            setNotificationMessage(`Information of ${existingPerson.name} has already been removed from server`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(persons.filter(p => p.id !== existingPerson.id));
             setNewName("");
             setNewNumber("");

          });
      }
    } else {
      const newPerson = {
        name: newName,
        phn: newNumber,
      };

      noteService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const deletPerson = (id, name) => {
    const ok = window.confirm(`Delete ${name} ?`);

    if (ok) {
      noteService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
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
      <Notification message={NotificationMessage} />

      <h4>Filter shown with</h4>
      <input value={findUser} onChange={findPerson} />
      {/* <Filter findUser={findUser} findPerson={findPerson}></Filter> */}

      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* <Form
        handleSubmit={handleSubmit}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      ></Form> */}

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.phn}
            <button onClick={() => deletPerson(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* <Person personsToShow={personsToShow}></Person> */}
    </div>
  );
};

export default App;
