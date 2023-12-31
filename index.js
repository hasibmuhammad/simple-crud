const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Database > Collection > Data
    // Setting the database name: usersDB, setting the userCollection name: users

    const userCollection = client.db("usersDB").collection("users");

    // Get all available users from mongodb database
    app.get("/users", async (req, res) => {
      // get all the data from the user collection and convert it to an array
      const result = await userCollection.find().toArray();

      res.send(result);
    });

    // setting a post api
    app.post("/user", async (req, res) => {
      const user = await req.body;

      console.log("Getting Data: ", user);

      // Once we get the data - we will call the insertOne function from userCollection and pass the data
      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    // Delete
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      console.log("from api", id);

      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);

      res.send(result);
    });

    // get single user - by id
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);

      res.send(result);
    });

    // update
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const user = await req.body;

      //setting filter and options for updating the data
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
        },
      };

      const result = await userCollection.updateOne(
        filter,
        updatedUser,
        options
      );

      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("<h1>Welcome from simple crud application!</h1>");
});

app.listen(port, (req, res) => {
  console.log(`Server is running on: ${port}`);
});
