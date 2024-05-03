import { SortBy, type User } from "./types.d";
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<String | null>(null);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const ToggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  useEffect(() => {
    setLoading(true)
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((error) => {
        console.error(error);
      })
    .finally(() => {
      setLoading(false)
    })
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
  }, [users, filterCountry]);


 
  const sortedUsers = useMemo(() => {

    
    if(sorting === SortBy.NONE) return filteredUsers
    if(sorting === SortBy.COUNTRY)  return filteredUsers.toSorted((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
    if (sorting === SortBy.NAME) return filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
      
    if(sorting === SortBy.LAST) return filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
  }, [filteredUsers, sorting]);
  
  

  return (
    <>
      <h1>List of users</h1>
      <header>
        <button onClick={toggleColors}>Colors</button>
        <button onClick={ToggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "Don`t sort by country"
            : "Sorty by country"}{" "}
        </button>
        <button onClick={handleReset}>Restore original users</button>
        <input
          type="text"
          placeholder="Filter by country"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        {loading && <p>Loading...</p>}
        {!loading && error && <p>Error fetching data</p>}
        {!loading && !error && users.length === 0 && <p>No users to display</p>}
        {!loading && !error && users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            users={sortedUsers}
            showColors={showColors}
            handleDelete={handleDelete}
          />
        )}
      </main>
    </>
  );
}

export default App;
