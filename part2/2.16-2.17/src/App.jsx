import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findUser, setFindUser] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    noteService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  // useEffect(() => {
  //   noteService.getAll().then((data) => {
  //     console.log("DATA FROM BACKEND:", data);
  //     console.log("IS ARRAY?", Array.isArray(data));
  //     setPersons(data);
  //   });
  // }, []);

  // Derived data
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
          number: newNumber,
        };

        noteService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson,
              ),
            );
            setNotificationMessage(`Updated ${returnedPerson.name}`);
            setNewName("");
            setNewNumber("");
            setTimeout(() => setNotificationMessage(null), 5000);
          })
          .catch(() => {
            setNotificationMessage(
              `Information of ${existingPerson.name} has already been removed from server`,
            );
            setPersons(persons.filter((p) => p.id !== existingPerson.id));
            setNewName("");
            setNewNumber("");
            setTimeout(() => setNotificationMessage(null), 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      noteService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage(`Added ${returnedPerson.name}`);
          setNewName("");
          setNewNumber("");
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch((error) => {
          const message = error.response?.data?.error || "Something went wrong";

          setNotificationMessage(message);
          setTimeout(() => setNotificationMessage(null), 5000);
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const deletePerson = (id, name) => {
    const ok = window.confirm(`Delete ${name}?`);

    if (ok) {
      noteService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  // console.log("PERSONS STATE:", persons);
  // console.log("PERSONS IS ARRAY?", Array.isArray(persons));
  // console.log("PERSONS TO SHOW:", personsToShow);
  // console.log("PERSONS TO SHOW IS ARRAY?", Array.isArray(personsToShow));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />

      <h4>Filter shown with</h4>
      <input value={findUser} onChange={(e) => setFindUser(e.target.value)} />

      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
