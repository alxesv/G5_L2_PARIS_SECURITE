import React, { useEffect, useState } from 'react';


export default function Home() {

    const [users, setUsers] = useState([])

    async function fetchUsers() {
        const response = await fetch('/api/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json()
        for (let user of data) {
           if(!user.allergies || user.allergies.length === 0) {
               data = data.filter((u) => u.username !== user.username)
           }else{
            for (let allergy of user.allergies) {
                if (allergy.isPrivate && allergy.isPrivate === true) {
                    user.allergies = user.allergies.filter((a) => a.allergy !== allergy.allergy)
                }
            }
            if(!user.allergies || user.allergies.length === 0) {
                data = data.filter((u) => u.username !== user.username)
            }
           }
        }
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
        <nav>
          <a href="/">Home</a>
          <a href="/allergy">Add allergy</a>
          <a href="/my-allergies">My allergies</a>
          <a href="/register">Register</a>
          <a href="/login">Login</a>
          <a href="/admin">Admin</a>
        </nav>
            <h1>Atchoum!</h1>

            <h2>Allergies</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <span>{user.username}</span>
                        <ul>
                            {user.allergies.map((allergy, index) => (
                                <li key={index}>{allergy.allergy}</li>
                            ))}
                        </ul>
                        </li>
                ))}
            </ul>
        </div>
    )
}