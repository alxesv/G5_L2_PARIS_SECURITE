import React, { useEffect, useState } from 'react';

export default function Admin() {

    const [users, setUsers] = useState([])

    async function fetchUsers() {
        const response = await fetch('/api/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <h1>Admin</h1>

            <h2>Users list</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}><a href={"admin/" + user.username}>{user.username}</a> <span>{user.isAdmin ? 'Admin' : '' }</span></li>
                ))}
            </ul>
        </div>
    )
}