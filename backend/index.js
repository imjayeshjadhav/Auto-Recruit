require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./Models/db');

const AuthRouter = require('./Routes/AuthRouter');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON

// Routes
app.use('/auth', AuthRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
