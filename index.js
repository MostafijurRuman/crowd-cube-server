
//index.js in server side

// 1. Import core dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. MongoDB URI & Client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fk4sfju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// 4. CRUD Routes
async function run() {
  try {
    await client.connect();
    const db = client.db("DB_NAME");
    const collection = db.collection("COLLECTION_NAME");

    // All CRUD operations here...
    
    

		// Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close(); // keep it open if you're hosting continuously
  }
}
run().catch(console.dir);

// 5. Basic route
app.get('/', (req, res) => {
  res.send('DanSodka Coming soon');
});

// 6. Listen to port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

