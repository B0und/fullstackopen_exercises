import React, { useState } from "react";

const NumbersDisplay = ({ persons }) => {
  // console.log(persons);
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showFiltered, setShowFiltered] = useState(true);
  const [newFilter, setNewFilter] = useState("")

  const filteredPhones = showFiltered 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  const addNumber = (event) => {
    event.preventDefault();

    function personExists(name) {
      return persons.some(function (element) {
        return element.name === name;
      });
    }

    if (personExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return <></>;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onFilterChange = (event) => {
    setNewFilter(event.target.value);
    if (newFilter.length !== 0) {
      setShowFiltered(true)
    }
    else {
      setShowFiltered(false)
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search names: <input onChange={onFilterChange} />
      </div>
      <h2>Add new contact</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input onChange={onNameChange} />
        </div>
        <div>
          number: <input onChange={onNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <NumbersDisplay persons={filteredPhones} />
    </div>
  );
};

export default App;
