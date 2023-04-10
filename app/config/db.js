// app/config/db.js (Camada Config)
const sqlite3 = require('sqlite3').verbose();
const path = require('path');



const dbFile = `${__dirname}`.replace('config', 'files/br_base_cnpj.db');

// Configuração do servidor
//const dbFile = path.join(process.env.DATABASES, 'br_base_cnpj.db');
// Conectar ao banco de dados SQLite3
const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('conectado no banco de dados "br_base_cnpj".');
});

module.exports = db;