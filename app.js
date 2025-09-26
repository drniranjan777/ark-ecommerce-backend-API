const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
// const AppError = require("./utils/AppError");
const routes = require('./routes/index')
const cors = require('cors');
const helmet = require('helmet');

require("dotenv").config();
require('./utils/swagger')(app); 

const PORT = process.env.PORT


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes); 
app.use(errorHandler)

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
