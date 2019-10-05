const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const http = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users/push-token', (req, res) => {
  console.log(req.body)
  return res.json({ status: 'tood' });
});

http.listen(3005, () => {
  console.log("Server started!");
});