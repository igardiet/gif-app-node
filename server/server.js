require('dotenv').config();
const { dbConnection } = require('./database/config');
const fileUpload = require('express-fileupload');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const gifRoutes = require('./routes/gif');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const seedDatabase = require('./seed/gifsSeed');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  })
);

app.use('/api/gifs', gifRoutes);
app.use('/api/user', userRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/api/seed', seedDatabase);

dbConnection();

app.listen(process.env.PORT || 3027, () => {
  console.log(`Server listening on PORT... ${process.env.PORT || 3027}`);
});

module.exports = app;
