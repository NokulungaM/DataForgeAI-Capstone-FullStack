// REQUIRED PACKAGES
const express = require("express");
const cors = require("cors");
// CONNECTING TO MONGODB
const { connectToMongoDB } = require("./db/connection");
const recipeRoutes = require('./routes/recipeRoutes'); // The refactored route that handles everything (fetching, processing, saving, and displaying)

//Routes to handle admin and user registration
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const mealPlan = require('./routes/mealPlanRoutes');
const profileRoutes = require('./routes/profileRoutes');
const random = require('./routes/randomRoutes');
const contactRoutes = require('./routes/contactRoutes')
// CONFIGURING ENVIRONMENT VARIABLES
require("dotenv").config();

// INITIALIZING EXPRESS APP
const app = express();

// PORT
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

// CORS FOR FRONTEND ACCESS TO THIS SERVER   
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// USING ROUTES
app.use('/api', recipeRoutes);  // Single route that handles fetching recipes from the DB or the API, processes them with Gemini, and saves them

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/meal-plan',mealPlan);
app.use('/random',random );
app.use('/profile',profileRoutes);
app.use('/contact',contactRoutes);

// STARTING THE SERVER AND CONNECTING TO MONGODB
async function startServer() {
  try {
    await connectToMongoDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("An error occurred while trying to start the server:", error);
    process.exit(1);
  }
}

startServer();

// EXPORT APP
module.exports = app;
