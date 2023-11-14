const express = require("express");
require("colors");
require("dotenv").config();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));

// Must use after mounting router
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
