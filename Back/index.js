require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const cors = require('cors');
const eventosRouter = require('./src/api/routes/evento');
const usersRouter = require('./src/api/routes/user');
const { connectCloudinary } = require('./src/config/cloudinary');

const app = express();

connectDB();
connectCloudinary();
app.use(cors());
app.use(express.json());

app.use('/api/v1/eventos', eventosRouter);
app.use('/api/v1/users', usersRouter);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route Not Found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
