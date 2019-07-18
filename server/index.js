const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const app = express();
const port =  3000;

app.use(express.static(path.join(__dirname, '../public')))
app.use('/photos', proxy('http://ec2-18-222-224-216.us-east-2.compute.amazonaws.com/photos/'));
// app.use('/', proxy('http://localhost:3002'));
app.use('/reviews', proxy('http://localhost:3003'));
// app.use('/', proxy('http://localhost:3004'));

app.get('/', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`Proxy now listening on port: ${port}`));
