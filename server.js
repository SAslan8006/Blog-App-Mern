const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');

//env config
dotenv.config();

//router import
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const apiLimiter = require('./middlewares/rateLimit');

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Or, to replace these prohibited characters with _, use:
app.use(mongoSanitize({ replaceWith: '_' }));

//Limiter Api Controls Middlewares
app.use('/api/v1/', apiLimiter);

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);

// Port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white);
});
