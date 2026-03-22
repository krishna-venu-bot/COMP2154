const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/dtt", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});