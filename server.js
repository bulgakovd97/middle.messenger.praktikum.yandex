const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
