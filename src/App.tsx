import { type User } from './types'
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<String | null>(null);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const ToggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //we filter before sorting to void extra rendering
  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country
          .toLowerCase()
          .includes(filterCountry.toLowerCase());
      })
      : users;
  },[users, filterCountry])
      

  const sortedUsers = useMemo(() => {
return sortByCountry
      ? filteredUsers.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers;
  }, [filteredUsers, sortByCountry]);

  return (
    <>
      <h1>List of users</h1>
      <header>
        <button onClick={toggleColors}>Colors</button>
        <button onClick={ToggleSortByCountry}>
          {sortByCountry ? "Don`t sort by country" : "Sorty by country"}{" "}
        </button>
        <button onClick={handleReset}>Restore original users</button>
        <input
          type="text"
          placeholder="Filter by country"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <UsersList
        users={sortedUsers}
        showColors={showColors}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App
