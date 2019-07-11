const express = require('express');
const bodyParser = require('body-parser');
const {db} = require('../database/index')
const port = 3004;
const path = require('path');
const cors = require('cors');

let app = express();

app.use(express.static(path.join(__dirname, `../client/dist`)));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/:id', (req, res) => {
  db.getDocument(req.params.id, (items) => {
    res.send(items);
    console.log("*Responded to Client Request*")
    });
});

const server = app.listen(port, () => console.log(`Pricing/ATC server listening on port ${port}`));

module.exports = server;