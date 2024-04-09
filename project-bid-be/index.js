const express = require('express');
const bodyParser = require('express');
const cors = require('cors');

const config = require('./src/config/config');
const connectDB = require('./src/config/dbConnection');
const routes = require('./src/routes/index');

const app = express();

app.use(bodyParser.json());

connectDB();

app.use(cors());

app.listen(config.port, async () => {

  console.log(`Server is running on port ${config.port}`);

  app.use(routes);

  app.use((req, res) => {
    res.status(404).json({ message: 'Api route not found' });
  })

});