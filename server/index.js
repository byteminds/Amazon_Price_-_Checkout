const express = require('express');
const bodyParser = require('body-parser');
const {db} = require('../database/index')
const port = 3004;

let app = express();

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/:id', (req, res) => {
  db.getDocument(req.params.id, (items) => {
    res.send(items);
  });
})

app.listen(port, () => console.log(`Server listening on port ${port}`));