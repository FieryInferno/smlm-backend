const express = require('express');
const app = express();
const cors = require('cors');
const corsOption = {origin: '*'};

app.use(cors(corsOption));

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('dotenv').config();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server is runnit on port ${PORT}`));

app.get('/', (req, res) => res.status(200).send({message: 'Welcome'}));
