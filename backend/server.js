const express = require("express");
require("colors");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable cors
app.use(cors());

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Set security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Sanitize data
app.use(mongoSanitize());

// Mount routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));

// Serve frontend
if (process.env.NODE_ENV === "production") {
	// Set build folder as static
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	// Load index.html in the build folder
	app.get("*", (req, res) =>
		res.sendFile(__dirname, "../", "frontend", "build", "index.html")
	);
} else {
	app.get("/", (req, res) => {
		res.status(200).json({ message: "Welcome to Nutritracker" });
	});
}

// Must use after mounting router
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
