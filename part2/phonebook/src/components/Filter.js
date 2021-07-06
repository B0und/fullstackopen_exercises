function Filter({ onFilterChange }) {
  return (
    <div>
      search names: <input onChange={onFilterChange} />
    </div>
  );
}

export default Filter;
