// app/swagger.js (Gerador de documentação da Api)
const swaggerAutogen = require('swagger-autogen')();

const outputFile = 'app/swagger/swagger.json';
const endpointsFiles = ['app/app.js'];

swaggerAutogen(outputFile, endpointsFiles);