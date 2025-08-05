
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
    const campaignCollection = client.db("CrowdCubeDB").collection("campaignCollection");
    const donationCollection = client.db("CrowdCubeDB").collection("donationCollection");

    // All CRUD operations here...
    
    //add new campaign
    app.post('/campaigns',async(req,res)=>{
        const campaign =req.body;
        const result = await campaignCollection.insertOne(campaign)
        res.send(result)
    })
    // Get all campaign 
    app.get('/campaigns', async(req,res)=>{
        const result = await campaignCollection.find().toArray();
        res.send(result)
    });
    // Get one campaign by id
    app.get('/campaigns/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await campaignCollection.findOne(query)
        res.send(result)
    });

    // Delete campaign by id 
    app.delete('/campaigns/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campaignCollection.deleteOne(query);
      res.send(result);
    });

// Update campaign

    app.put('/campaigns/:id', async (req, res) => {
      const id = req.params.id;
      const campaign = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
      $set: {
        image: campaign.image,
        title: campaign.title,
        type: campaign.type,
        description: campaign.description,
        minDonation: campaign.minDonation,
        deadline: campaign.deadline,
        goalAmount: campaign.goalAmount,
        creatorEmail: campaign.creatorEmail,
        creatorName: campaign.creatorName,
        creatorPhoto: campaign.creatorPhoto,
      },
      };
      const result = await campaignCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });




    // Donation Data
  // Add a donation to a specific campaign
  app.post('/donations', async (req, res) => {
    const donation = req.body;
    const result = await donationCollection.insertOne(donation);
    res.send(result);
  });

// Get all donations
app.get('/donations', async (req, res) => {
  const result = await donationCollection.find().toArray();
  res.send(result);
});


		// Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close(); // keep it open if you're hosting continuously
  }
}
run().catch(console.dir);

// 5. Basic route
app.get('/', (req, res) => {
  res.send('Welcome to CrowdCube Server! API is running successfully.');
});

// 6. Listen to port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

