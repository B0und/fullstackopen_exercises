import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import AddPerson from "./components/AddPerson";
import Contacts from "./components/Contacts";
import personsService from "./services/persons";
import Notification from "./components/notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showFiltered, setShowFiltered] = useState(true);
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState({});

  // load data from server
  useEffect(() => {
    personsService.getAll().then((serverPersons) => {
      setPersons(serverPersons);
    });
  }, []);

  const filteredPhones = showFiltered
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().startsWith(newFilter.toLowerCase())
      );

  const addNumber = (event) => {
    event.preventDefault();

    function personExists(name) {
      return persons.some(function (element) {
        return element.name === name;
      });
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (personExists(newName)) {
      if (
        window.confirm(
          ` ${newName} already in phonebook, replace the old number with a new one?`
        )
      ) {
        const updateId = persons.find((person) => person.name === newName).id;
        personsService
          .update(updateId, newPerson)
          .then((serverPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updateId ? serverPerson : person
              )
            );
            setMessageStyle(messageSuccessStyle);
            setErrorMessage(`Replaced number for ${newName}`);
          })
          .catch((error) => {
            setErrorMessage(`${newName} already deleted from server`);
            setMessageStyle(messageFailStyle);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
      return <></>;
    }

    personsService
      .create(newPerson)
      .then((newDbPerson) => {
        setNewName("");
        setNewNumber("");
        setPersons(persons.concat(newDbPerson));
        setMessageStyle(messageSuccessStyle);
        setErrorMessage(`Added ${newName}`);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
        setMessageStyle(messageFailStyle);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    setNewName("");
    setNewNumber("");
    return <></>;
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
      setShowFiltered(true);
    } else {
      setShowFiltered(false);
    }
  };

  const deleteHandler = (event) => {
    console.log(event);
    const personId = event.target.attributes.getNamedItem("personid").value;

    console.log(personId);
    console.log(persons);
    const deletePerson = persons.find((person) => person.id === personId);
    if (window.confirm(`Do you really want to delete ${deletePerson.name}?`)) {
      personsService.deletePerson(personId);
      setPersons(persons.filter((person) => person.id !== personId));
      setMessageStyle(messageSuccessStyle);
      setErrorMessage(`Removed ${deletePerson.name}`);
    }
  };

  const messageSuccessStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 22,
    padding: 20,
  };

  const messageFailStyle = {
    color: "red",
    fontStyle: "bold",
    fontSize: 22,
    padding: 20,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} messageStyle={messageStyle} />
      <Filter onFilterChange={onFilterChange} />

      <AddPerson
        addNumber={addNumber}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts persons={filteredPhones} deleteHandler={deleteHandler} />
    </div>
  );
};

export default App;
