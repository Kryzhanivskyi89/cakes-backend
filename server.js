// const app = require('./app');
require('dotenv').config();
require("colors");

const { DB_HOST, PORT } = process.env;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ordersRouter = require('./routes/orders'); 
const galleryRouter = require('./routes/gallery');
const galleryCategoryRouter = require('./routes/galleryCategory');
const webhookRouter = require("./routes/webhookClaudinary");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`Database is connected`  .green.italic.bold))
  .catch((error) => {
    console.error('Database connection error:'.red.bold);
    process.exit(1);
  });

app.use('/orders', ordersRouter); 
app.use("/gallery", galleryRouter);
app.use("/webhook", webhookRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.italic.bold);
});