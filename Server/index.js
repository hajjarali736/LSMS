// Import necessary modules
import express from "express";
import cors from "cors";
import { adminRouter } from "./routes/adminroute.js";

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/auth', adminRouter);
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Life Sculptor Server is running on port ${PORT}`);
});
