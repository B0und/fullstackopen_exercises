function AddPerson(props) {
  return (
    <div>
      <h2>Add new contact</h2>
      <form onSubmit={props.addNumber}>
        <div>
          name: <input onChange={props.onNameChange} />
        </div>
        <div>
          number: <input onChange={props.onNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default AddPerson;
