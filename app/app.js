// app/app.js
const express = require('express');
var IP = require("ip");
const app = express();
 
const PORT = 3030;

/**
 * Routes.
 */
const estabeleRouter = require('./routes/estabelecimentos');

/** 
* Express middleware. 
*/
// analisa solicitações recebidas com cargas JSON 
app.use(express.json());
// Middleware para encerrar a requisição
app.use((req, res, next) => {
    res.on('finish', () => {
      finished = true;
    });
    next();
        })

// analisa as solicitações recebidas com cargas úteis codificadas com urlen 
// extended: true - analisando os dados codificados com URL com a biblioteca querystring 
app.use(express.urlencoded({extended: true}));

// analisa as solicitações recebida e passa para o routes estabelecimentos com
app.use('/api/v1', estabeleRouter);

// starta a api service
function onStart(){
    console.log(`O servidor está escutando na porta ${PORT} url: http://${IP.address()}:${PORT}/`);
}

app.listen(PORT, onStart);

module.exports = app;