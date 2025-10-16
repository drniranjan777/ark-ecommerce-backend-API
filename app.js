const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
// const AppError = require("./utils/AppError");
const routes = require('./routes/index')
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');


require("dotenv").config();
require('./utils/swagger')(app); 

const PORT = process.env.PORT

// Serve uploaded files publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(helmet());

//handle cors
app.use(cors());

//request body values
app.use(express.json());


//rate limiter 
const globalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // 100 requests per 10 min
  message: { error: "Too many requests, try again later." },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(globalLimiter);

app.get('/',(_,res) => {
  return res.send({message:"Api is Live"})
})

//handle routes
app.use('/api', routes); 

//handle errors from app errors
app.use(errorHandler)


//db connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); 
});
