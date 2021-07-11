const Contacts = ({ persons, deleteHandler }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
          <button personid={person.id} onClick={deleteHandler}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
