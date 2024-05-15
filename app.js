const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');
const app = express();

const auth = require('./auth');
const loginRoute = require('./src/routes/loginRoute'); 
const userRoute = require('./src/routes/userRoute'); 
const projectRoute = require('./src/routes/projectRoute'); 

// Configurar acesso à BD.
const mongoose = require('mongoose');
let url = 'mongodb://127.0.0.1:27017/fatec'
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar ao MongoDB'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(loginRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: 'Token de acesso não fornecido' });
  }

  jwt.verify(token, '1234', (err, user) => {
      if (err) {
          return res.status(403).json({ error: 'Token inválido' });
      }
      req.user = user;
      next();
  });
}

app.use(authenticateToken);
app.use(userRoute)
app.use(projectRoute)

  app.listen(3000, () => {
    console.log('Servidor em execução na porta 3000');
});