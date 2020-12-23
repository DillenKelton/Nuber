const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI, NODE_ENV } = require("./config");

if (NODE_ENV === "development") {
  const dotenv = require("dotenv");
  // Initialize env conf
  dotenv.config();
}

// Initialize express app
const app = express();

// Initialize port from env var
const PORT = process.env.PORT || 5000;

// Routes
const routes = require("./routes");

// Connect to NuberDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

// Body Parser
app.use(express.json());

// Use Routes
app.use(routes);

app.get("/", (req, res) => {
  res.send("Hello from Nuber");
});
