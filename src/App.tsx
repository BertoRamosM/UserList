import { type User } from './types'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState<User[]>([])
  
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
      
    </>
  )
}

export default App
