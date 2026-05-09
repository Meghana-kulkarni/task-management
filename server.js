require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ IMPORTANT ORDER
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskroutes");

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});