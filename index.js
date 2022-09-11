const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { query } = require("express");
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

    //Collections
    const productsCollection = client
      .db("product_listing")
      .collection("products");
    const cartCollection = client.db("product_listing").collection("cart");
    //Get all Products
    app.get("/products", async (req, res) => {
      const searchtxt = req.query.name;
      const category = req.query.category;
      const size = req.query.size;
      console.log(searchtxt);
      let result;
      if (searchtxt === "" || category === "" || size === "") {
        const query = {};
        const cursor = productsCollection.find(query);
        result = await cursor.toArray();
      } else {
        const query = [
          { name: new RegExp(searchtxt, "i") },
          { category: category },
          { size: size },
        ];
        const cursor = productsCollection.find(query);
        result = await cursor.toArray();
      }
      res.send(result);
    });
  } finally {
    // Server is running
  }
};
run().catch(console.dir);
//  Listning to the port
app.listen(port, () => console.log(`Listning to the port ${port}`));
