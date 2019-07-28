const express = require('express');
const bodyParser = require('body-parser');
const {db} = require('../database/index')
const port = 80;
const path = require('path');
const cors = require('cors');

let app = express();

app.use('/:id', express.static(path.join(__dirname, `../client/dist`)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/pricingAPI/:id', (req, res) => {
  db.getDocument(req.params.id, (items) => {
    res.send(items);
    });
});

const server = app.listen(port, () => console.log(`Pricing component server listening on port ${port}`));

module.exports = server;