import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.DB_URI || "mongodb://localhost/IssueIQ"; // MongoDB URI from environment variable or default to local database IssueIQ
    await mongoose.connect(mongoURI, {});
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

export default connectDB;
