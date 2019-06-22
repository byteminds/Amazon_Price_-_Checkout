const express = require('express');
const bodyParser = require('body-parser');
const port = 3004;

let app = express();

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => `Server listening on port: ${port}`);