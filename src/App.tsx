import { SortBy, type User } from "./types.d";
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import UsersList from "./components/UsersList";
import { useQuery } from "@tanstack/react-query"

const fetchUsers = async (page: number) => {
    return await fetch(
      `https://randomuser.me/api/?results=10&seed=ramos&page=${page}`
    )
      .then(async res => await res.json())
      .then((data) => {
       return data.results
      });
}


function App() {
  
 useQuery(
    ['users'],
    () => fetchUsers(1)
  ) 
  
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<String | null>(null);

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)

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
    setError(false)

    fetchUsers(currentPage)
      .then(users => {
        setUsers(prevState => {
        const newUsers = prevState.concat(users)
          originalUsers.current = newUsers;
          return newUsers
      })
  })
      .catch((error) => {
        setError(error)
        console.error(error);
      })
      .finally(() => {
      setLoading(false)
    })
  }, [currentPage]);

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
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            users={sortedUsers}
            showColors={showColors}
            handleDelete={handleDelete}
          />
        )}
        {loading && <div className="loader"></div>}
        {error && <p>Oooops... There was a problem</p>}
        {!error && users.length === 0 && <p>No users to display</p>}

        {!loading && !error && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            Load more results
          </button>
        )}
      </main>
    </>
  );
}

export default App;
