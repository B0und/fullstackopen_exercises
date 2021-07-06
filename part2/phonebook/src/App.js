import React, { useState } from "react";

const NumbersDisplay = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addNumber = (event) => {
    console.log("Pressed button lmao", newName);
    event.preventDefault();
    const newPerson = {
      name: newName,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={onNameChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <NumbersDisplay persons={persons} />
    </div>
  );
};

export default App;
