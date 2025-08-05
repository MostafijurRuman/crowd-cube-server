
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

let client;
let clientPromise;

// Initialize MongoDB connection
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// 4. Database Collections
let campaignCollection, donationCollection;

// Initialize database connection
async function connectDB() {
  try {
    const client = await clientPromise;
    campaignCollection = client.db("CrowdCubeDB").collection("campaignCollection");
    donationCollection = client.db("CrowdCubeDB").collection("donationCollection");
    
    // Send a ping to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB successfully!");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return false;
  }
}

// 5. CRUD Routes
// Ensure DB connection before handling requests
app.use(async (req, res, next) => {
  if (!campaignCollection || !donationCollection) {
    await connectDB();
  }
  next();
});

// Add new campaign
app.post('/campaigns', async (req, res) => {
  try {
    const campaign = req.body;
    const result = await campaignCollection.insertOne(campaign);
    res.send(result);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).send({ error: 'Failed to create campaign' });
  }
});

// Get all campaigns 
app.get('/campaigns', async (req, res) => {
  try {
    const result = await campaignCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).send({ error: 'Failed to fetch campaigns' });
  }
});

// Get one campaign by id
app.get('/campaigns/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await campaignCollection.findOne(query);
    if (!result) {
      return res.status(404).send({ error: 'Campaign not found' });
    }
    res.send(result);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).send({ error: 'Failed to fetch campaign' });
  }
});

// Delete campaign by id 
app.delete('/campaigns/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await campaignCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).send({ error: 'Failed to delete campaign' });
  }
});

// Update campaign
app.put('/campaigns/:id', async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).send({ error: 'Failed to update campaign' });
  }
});

// Donation Data
// Add a donation to a specific campaign
app.post('/donations', async (req, res) => {
  try {
    const donation = req.body;
    const result = await donationCollection.insertOne(donation);
    res.send(result);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).send({ error: 'Failed to create donation' });
  }
});

// Get all donations
app.get('/donations', async (req, res) => {
  try {
    const result = await donationCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).send({ error: 'Failed to fetch donations' });
  }
});

// 6. Basic route
app.get('/', (req, res) => {
  res.send('Welcome to CrowdCube Server! API is running successfully.');
});

// 7. Initialize database connection
connectDB();

// 8. Listen to port (for local development)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for Vercel
module.exports = app;

