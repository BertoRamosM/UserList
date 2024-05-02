import { type User } from './types'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors);
  }

  const ToggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const sortedUsers = sortByCountry ? users.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country);
  }) : users
  
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers) 
   
  }

  
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results)
         originalUsers.current = data.results;
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

 
  return (
    <>
      <h1>List of users</h1>
      <header>
        <button onClick={toggleColors}>Colors</button>
        <button onClick={ToggleSortByCountry}>{sortByCountry ? 'Remove sort' : 'Sorty by country'} </button>
        <button onClick={handleReset}>Restore original users</button>
      </header>
      <UsersList users={sortedUsers} showColors={showColors} handleDelete={handleDelete} />
    </>
  )
}

export default App
