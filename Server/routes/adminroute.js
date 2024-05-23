import express from "express";
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const router = express.Router();

// Connection URI
const uri = process.env.MONGODB_URI; // MongoDB URI from .env

// Database Name
const dbName = 'life_sculptor_management_system'; // Your database name

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

// Connect to MongoDB
client.connect(function(err) {
  if (err) {
    console.log("Connection error:", err);
    return;
  }

  console.log("Connected to the MongoDB database");

  const db = client.db(dbName);

  // Admin Login Route
  router.post('/adminslogin', (req, res) => {
    const collection = db.collection('admins');
    const { email, password } = req.body;

    collection.findOne({ email, password }, (err, result) => {
      if (err) {
        return res.json({ loginStatus: false, error: "Query error" });
      }

      if (result) {
        const token = jwt.sign(
          { role: "admins", email },
          process.env.JWT_SECRET_KEY, // Use an environment variable for the secret key
          { expiresIn: '1d' }
        );
        res.cookie('token', token);
        return res.json({ loginStatus: true });
      } else {
        return res.json({ loginStatus: false, error: "Wrong email or password" });
      }
    });
  });

  // Category Routes
  router.get('/category', (req, res) => {
    const collection = db.collection('category');
    collection.find({}).toArray((err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });

  router.post('/add_category', (req, res) => {
    const collection = db.collection('category');
    collection.insertOne({ category: req.body.category }, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
    });
  });

  // Student Routes
  router.get('/student', (req, res) => {
    const collection = db.collection('student');
    collection.find({}).toArray((err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });

  router.post('/add_student', (req, res) => {
    const collection = db.collection('student');
    const studentData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailaddress: req.body.emailaddress,
      school: req.body.school,
      phonenumber: req.body.phonenumber,
    };
    collection.insertOne(studentData, (err, result) => {
      if (err) {
        console.error("Error executing MongoDB query:", err);
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true });
    });
  });

  // Volunteer Routes
  router.get('/volunteer', (req, res) => {
    const collection = db.collection('volunteer');
    collection.find({}).toArray((err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });

  router.post('/add_volunteer', (req, res) => {
    const collection = db.collection('volunteer');
    const volunteerData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emailaddress: req.body.emailaddress,
      volunteering: req.body.volunteering,
      phonenumber: req.body.phonenumber,
    };
    collection.insertOne(volunteerData, (err, result) => {
      if (err) {
        console.error("Error executing MongoDB query:", err);
        return res.status(500).json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true });
    });
  });

  // Admin Record Route
  router.get('/admin_record', (req, res) => {
    const collection = db.collection('admin');
    collection.find({}).toArray((err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });

  // Logout Route
  router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
  });

});

export { router as adminRouter };
