import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/utils/getCurrentUser';


export default function MyAllergies() {


  const [user, setUser] = useState()
  const [allergies, setAllergies] = useState([])


  let name;

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

  useEffect(() => {
    name = getCurrentUser(document.cookie.split('; ').find(row => row.startsWith('accessToken')).split('=')[1]).username;
  }, [user])

  useEffect(() => {
    fetchUser()
  }, [allergies])

    return (
        <div>
            <h1>My Allergies</h1>

            <ul>
            {allergies && allergies.length > 0 ? allergies.map((allergy, index) => (
                <li key={index}>{allergy.allergy} {allergy.isPrivate ? 'Private' : 'Public'} <button onClick={() => {handleRemove(allergy.allergy)}}>X</button></li>
            )) : <h2>No allergies</h2>}
        </ul>

        </div>
    )
}