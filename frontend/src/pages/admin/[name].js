import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';

 
export default function Page() {
  const router = useRouter()
  const { name } = router.query
  const [user, setUser] = useState([])
  const [allergies, setAllergies] = useState([])

  async function fetchUser() {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username: name }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    setUser(data)
    setAllergies(data.allergies)
  }

  async function handleRemove(allergy){
    const response = await fetch('/api/remove', {
      method: 'POST',
      body: JSON.stringify({ username: name, allergy: allergy }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    setAllergies(allergies.filter((allergy) => allergy.allergy !== allergy))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.target)
    const response = await fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify({ username: name, isAdmin: data.get('isAdmin') }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  useEffect(() => {
    fetchUser()
  }, [router.query.name])

  useEffect(() => {
    fetchUser()
  }, [allergies])

  return (
    <div>
    <a href='/admin'>Back to admin page</a>
      <h1>{router.query.name}</h1>
      {user.isAdmin ? <h2>Admin</h2> :
                   <form onSubmit={onSubmit}>
                    <label>Admin</label>
                    <input type="checkbox" name="isAdmin" />
                    <button type='submit'>Change</button>
                    </form>}
        <h2>Allergies</h2>
        <ul>
            {allergies ? allergies.map((allergy, index) => (
                <li key={index}>{allergy.allergy} {allergy.isPrivate ? 'Private' : 'Public'} <button onClick={() => {handleRemove(allergy.allergy)}}>X</button></li>
            )) : ''}
        </ul>
    </div>
  )
}