import "./App.css";

function App() {
  const handleAddUser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Successfully created the user!");
          form.reset();
        }
      });
  };

  return (
    <>
      <h1>Simple CRUD</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Enter your name" />
        <br />
        <input type="email" name="email" placeholder="Enter your email" />
        <br />
        <br />
        <button type="submit">Add User</button>
      </form>
    </>
  );
}

export default App;
