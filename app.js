const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
// const AppError = require("./utils/AppError");
const routes = require('./routes/index')
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');


require('./utils/swagger')(app); 
app.disable('x-powered-by');

const PORT = process.env.PORT

// Serve uploaded files publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(helmet());

//handle cors
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // frontend URL
  credentials: true               // allow cookies
}));

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

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
      ttl: 60 * 15, // 15 minutes
      autoRemove: 'native',
    }),
    cookie: {
      maxAge: 1000 * 60 * 15, // 15 min
      secure: false, // true if using HTTPS
      httpOnly: true, // prevents JS access to cookie
      sameSite: 'lax', 
    },
  })
);

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


