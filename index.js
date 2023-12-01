const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// hasibmu99
// j8sVQAdPu7dGmXHr

const uri =
  "mongodb+srv://hasibmu99:j8sVQAdPu7dGmXHr@cluster0.er9gvke.mongodb.net/?retryWrites=true&w=majority";

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
    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    // setting a post api
    app.post("/user", async (req, res) => {
      const user = await req.body;

      console.log("Getting Data: ", user);

      // Once we get the data - we will call the insertOne function from userCollection and pass the data
      const result = await userCollection.insertOne(user);

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