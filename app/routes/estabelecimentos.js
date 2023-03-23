//app/routes/estabelecimentos.js
const db = require('./db');
const sqlite3 = require('sqlite3').verbose();
const router = require('express').Router();
const path = require('path');

router.route('/estabelecimentos/all')
  .get(function(req, res, next) {
    // definindo encoding da resposta da api
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
    }
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers)
      res.end()
      return
    }

    const query = `SELECT * FROM estabelecimentos;`;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
        return;
      }

      res.json(rows);
    });
  });



router.route('/estabelecimentos/cnpj=:cnpj')
    // Insere dados no banco de dados CNPJ
    .post(function(req, res, next) {
        const cnpj = req.body.cnpj.replace(/[^0-9]/g, '');
        const razao_social = req.body.razao_social;
        const nome_fantasia = req.body.nome_fantasia;
        const rua = req.body.rua;
        const numero = req.body.numero;
        const complemento = req.body.complemento;
        const bairro = req.body.bairro;
        const cidade = req.body.cidade;
        const estado = req.body.estado;
        const cep = req.body.cep;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const telefone1 = req.body.telefone1;
        const site = req.body.site;
        const cnae_descricao = req.body.cnae_descricao;
        const horario_funcionamento = req.body.horario_funcionamento;
        const instagram = req.body.instagram;
        const facebook = req.body.facebook;
        const opcoes_de_servico = req.body.opcoes_de_servico;
        const usuario = req.body.usuario;
        const chave_acesso = req.body.chave_acesso;
        db.run(`INSERT INTO estabelecimentos 
        (CNPJ, RAZAO_SOCIAL, NOME_FANTASIA, RUA, NUMERO, COMPLEMENTO, BAIRRO, CIDADE, ESTADO, CEP, LATITUDE, LONGITUDE, TELEFONE1, SITE, CNAE_DESCRICAO, HORARIO_FUNCIONAMENTO, INSTAGRAM, FACEBOOK, OPCOES_DE_SERVICO) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [cnpj, razao_social, nome_fantasia, rua, numero, complemento, bairro, cidade, estado, cep, latitude, longitude, telefone1, site, cnae_descricao, horario_funcionamento, instagram, facebook, opcoes_de_servico], (err) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({
        message: `CNPJ ${cnpj} adicionado com sucesso`,
        cnpj: cnpj
        });
        });
    })
    .delete(function (req, res, next) {
        const cnpj = req.params.cnpj;
        const usuario = req.body.usuario;
        const chave_acesso = req.body.chave_acesso;

        db.run(`DELETE FROM estabelecimentos WHERE CNPJ = ?`, cnpj, (err) => {
        if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
        res.json({
        message: `CNPJ ${cnpj} deletado com sucesso`
        });
        });
    })
    // Update em um dado no banco CNPJ
    .put(function(req, res, next) {
        const cnpj = req.params.cnpj.replace(/[^0-9]/g, '');
        const razao_social = req.body.razao_social;
        const nome_fantasia = req.body.nome_fantasia;
        const rua = req.body.rua;
        const numero = req.body.numero;
        const complemento = req.body.complemento;
        const bairro = req.body.bairro;
        const cidade = req.body.cidade;
        const estado = req.body.estado;
        const cep = req.body.cep;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const telefone1 = req.body.telefone1;
        const site = req.body.site;
        const cnae_descricao = req.body.cnae_descricao;
        const horario_funcionamento = req.body.horario_funcionamento;
        const instagram = req.body.instagram;
        const facebook = req.body.facebook;
        const opcoes_de_servico = req.body.opcoes_de_servico;
        const usuario = req.body.usuario;
        const chave_acesso = req.body.chave_acesso;
        db.run(`UPDATE estabelecimentos SET RAZAO_SOCIAL = ?, NOME_FANTASIA = ?, RUA = ?, NUMERO = ?, COMPLEMENTO = ?, BAIRRO = ?, CIDADE = ?, ESTADO = ?, CEP = ?, LATITUDE = ?, LONGITUDE = ?, TELEFONE1 = ?, SITE = ?, CNAE_DESCRICAO = ?, HORARIO_FUNCIONAMENTO = ?, INSTAGRAM = ?, FACEBOOK = ?, OPCOES_DE_SERVICO = ? WHERE CNPJ = ?`, 
        [razao_social, nome_fantasia, rua, numero, complemento, bairro, cidade, estado, cep, latitude, longitude, telefone1, site, cnae_descricao, horario_funcionamento, instagram, facebook, opcoes_de_servico, cnpj], (err) => { 
            if (err) { res.status(500).json({ error: err.message }); 
            return; } 
            res.json({ 
                message: `CNPJ ${cnpj} modificado com sucesso`
            });
        });
    })
    // Obter os dados por CNPJ
    .get(function(req, res, next) {
        const cnpj = req.params.cnpj;
        db.get(`SELECT * FROM estabelecimentos WHERE cnpj = ?`, [cnpj], (err, row) => {
            if (err) {
                res.status(500).json({error: err.message});
                return;    
            }
            if(!row) {
                res.status.json({error : `CNPJ ${cnpj} NÃO ENCONTRADO`});
                return;
            }
            res.json(
                row
            );
        })
    });
router.route('/estabelecimentos/uf=:uf')
// Obter dados pelo estado
     .get(function(req, res, next) {
        var uf = req.params.uf.toUpperCase();
        db.all(`SELECT * FROM estabelecimentos WHERE ESTADO = ?`, [uf], (err, rows) =>{
            if(err) {
              res.status(500).json({error: err.message});
              return;
            }
            console.log(`Retornando ${rows.length} dados do ${uf}`)
            res.json(
              rows
            );
          });
     })
router.route('/estabelecimentos/uf=:uf/numero_cnae=:numero_cnae')
// Obter dados pelo cnae e estado
    .get(function(req, res, next) {
        var uf = req.params.uf.toUpperCase();
        var numero_cnae = parseInt(req.params.numero_cnae);
        if (numero_cnae === 5611201) {
            cnae_descricao = 'RESTAURANTES E SIMILARES';
          } else if (numero_cnae === 5611203) {
            cnae_descricao = 'LANCHONETES CASAS DE CHÁ DE SUCOS E SIMILARES';
          } else if (numero_cnae === 5611204){
            cnae_descricao = 'BARES E OUTROS ESTABELECIMENTOS ESPECIALIZADOS EM SERVIR BEBIDAS SEM ENTRETENIMENTO';
          } else if (numero_cnae === 5611205) {
            cnae_descricao = 'BARES E OUTROS ESTABELECIMENTOS ESPECIALIZADOS EM SERVIR BEBIDAS COM ENTRETENIMENTO';
          } else if (numero_cnae === 5612100) {
            cnae_descricao = 'SERVIÇOS AMBULANTES DE ALIMENTAÇÃO';
          }
          //console.log(cnae_descricao)
          db.all(`SELECT * FROM estabelecimentos WHERE ESTADO = $1 AND CNAE_DESCRICAO = $2`, [uf, cnae_descricao], (err, rows) =>{
            if(err) {
              res.status(500).json({error: err.message});
              return;
            }
            console.log(`Retornando ${rows.length} dados do ${uf} cnae ${cnae_descricao, numero_cnae}`)
            res.json(
              rows
            );
          });
    })
module.exports = router;