import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Connection URI
const uri = process.env.MONGODB_URI; // MongoDB Atlas URI from .env

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Connect to MongoDB
client.connect(function(err) {
  if(err) {
    console.log("Connection error:", err);
  } else {
    console.log("Connected to the MongoDB database");

    // You can use the client to interact with the database
    // For example:
    // const db = client.db('life_sculptor_management_system');
    // db.collection('<collection_name>').find({}).toArray((err, docs) => {
    //   console.log(docs);
    // });
  }
});

export default client;
