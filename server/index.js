const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const {db} = require('../database/index');
const path = require('path');
const cors = require('cors');
const port = 80;

let app = express();

app.use(cors());
app.use(compression());
app.use('/:id/', express.static(path.join(__dirname, `../client/dist`)));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pricingAPI/:id', (req, res) => {
  db.getDocument(req.params.id, (items) => {
    res.send(items);
    });
});

const server = app.listen(port, () => console.log(`Pricing component server listening on port ${port}`));

module.exports = server;