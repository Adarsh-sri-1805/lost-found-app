const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
    res.send("Lost & Found API Running 🚀");
});

// connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));