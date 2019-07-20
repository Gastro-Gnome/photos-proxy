const express = require('express');
const proxy = require('express-http-proxy');
const path = require('path');
const app = express();
const port =  3000;

app.use('/:businessId', express.static(path.join(__dirname, '../public')));

app.use('/:businessId/photos', proxy('http://52.90.9.19', {
  proxyReqPathResolver: (req) => {
    let url = req.url;
    if (url !== '/main.js'){
      url = '/photos';
    }
    return `/${req.params.businessId}${url}`;
  }
}));
// app.use('/header', proxy('http://18.191.38.179/', {
//   proxyReqPathResolver: (req) => {
//     console.log(req.url);
//     let url = req.url;
//     if (url !== '/bundle.js'){
//       url = '/header' + req.url;
//     }
//     console.log(url);
//     return url;
//   }
// }));
// app.use('/reviews', proxy('http://13.52.99.182:1337',{
//   proxyReqPathResolver: (req) => {
//     console.log(req.url);
//     let url = req.url;
//     if (url !== '/dist/bundle.js'){
//       url = '/reviews' + req.url;
//     }
//     console.log(url);
//     return url;
//   }
// }));
// app.use('/', proxy('http://localhost:3004'));

app.get('/', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`Proxy now listening on port: ${port}`));
