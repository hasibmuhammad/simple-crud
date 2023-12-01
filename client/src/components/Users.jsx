import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setUsers(users.filter((user) => user._id !== id));
        }
      });
  };
  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user._id}>
          <p>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user._id)}>X</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Users;
