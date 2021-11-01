const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errrorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = [ 'http://localhost:8080', 'https://myapp.co', 'http://localhost:3000', undefined ];
const options = {
  origin: (origin, callback) => {
    console.log(origin);
    if(whitelist.includes(origin)){
      callback(null, true);
    }
    else{
      callback(new Error('no permitido'))
    }
  }
}

app.use(cors(options));
//app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errrorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
});
