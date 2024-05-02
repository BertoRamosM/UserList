import { type User } from './types'
import { useEffect, useState } from 'react'
import './App.css'
import UsersList from './components/UsersList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors);
  }
  
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results)
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
      </header>
      <UsersList users={users} showColors={showColors} />
    </>
  )
}

export default App
