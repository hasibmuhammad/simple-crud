import { useLoaderData } from "react-router-dom";

const Update = () => {
  const user = useLoaderData();
  console.log(user);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const updatedUser = { name, email };

    console.log(updatedUser);

    fetch(`http://localhost:3000/user/${user._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Updated Successfully!");
        }
      });
  };
  return (
    <div>
      <h1>Update - {user.name}</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={user.name} />
        <br />
        <input type="email" name="email" defaultValue={user.email} />
        <br />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Update;
