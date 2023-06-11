const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.send('Not Found');
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
