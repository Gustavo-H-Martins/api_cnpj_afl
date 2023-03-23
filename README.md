# API CNPJ
### [app.js](./app/app.js)
Este arquivo é responsável por configurar e iniciar a API.
* [Documentação](app\swagger\swagger.json)

### Requisitos
    Para rodar este aplicativo, você precisa ter os seguintes softwares instalados em seu sistema:
* Node.js

Execute 

``` BATCH
npm ci
``` 
na pasta que contém o arquivo [package.json](./package.json) para restaurar os pacotes

## Executando a API
Para iniciar a API, execute o seguinte comando:
``` BATCH
npm start
```

## Configuração da API
A API escuta na porta `3030` e tem as seguintes rotas disponíveis:

###  ```/api/v1/estabelecimentos``` [estabelecimentos.js](app\routes\estabelecimentos.js)

* `GET /api/v1/estabelecimentos/all`: Retorna uma lista de todos os estabelecimentos.
* `GET /api/v1/estabelecimentos/cnpj=:cnpj`: Retorna um estabelecimento específico com base no CNPJ.
* `POST /api/v1/estabelecimentos/cnpj=:cnpj`: Adiciona um novo estabelecimento.
* `PUT /api/v1/estabelecimentos/cnpj=:cnpj`: Atualiza um estabelecimento específico com base no CNPJ.
* `DELETE /api/v1/estabelecimentos/cnpj=:cnpj`: Remove um estabelecimento específico com base no CNPJ.
* `GET /api/v1/estabelecimentos/uf=:uf`: Retorna uma lista de todos os estabelecimentos de um estado.
* `GET /api/v1/estabelecimentos/uf=:uf/numero_cnae=:numero_cnae`: Retorna uma lista de todos os estabelecimentos de um estado com base na descrição do código CNAE

### Middleware
A API usa o seguinte middleware:
* `express.json()`: Analisa solicitações recebidas com cargas JSON.
* `express.urlencoded({extended: true})`: Analisa as solicitações recebidas com cargas úteis codificadas com urlen.

### Função de inicialização
A função `onStart()` é responsável por iniciar a API e imprimir a URL de acesso no console.

### [db.js](app\routes\db.js)
É usado para configurar e acessar o banco de dados utilizado na api.

[![Gustavo-H-Martins](https://github-readme-stats.vercel.app/api?username=Gustavo-H-Martins&show_icons=true&theme=radical)](https://github.com/Gustavo-H-Martins)