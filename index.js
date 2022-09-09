const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// DB info
const uri = `mongodb+srv://${process.env.DBUser}:${process.env.DBPass}@cluster0.rotkkc2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// Main function
const run = async () => {
  try {
    //DB client connect
    await client.connect();
  } finally {
    // Server is running
  }
};
run().catch(console.dir);
//  Listning to the port
app.listen(port, () => console.log(`Listning to the port ${port}`));
