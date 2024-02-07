import React from "react";

export default function List() {

    const [users, setUsers] = React.useState([]);

    async function getUsers() {
        const response = await fetch('http://localhost:8000/api/list');
        const users = await response.json();
        setUsers(users);
        console.log(result);
    }

    return(
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}