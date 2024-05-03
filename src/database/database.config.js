require('dotenv').config();
module.exports = {
    username: process.env.DB_USER,    //Usuário do servidor do banco de dados
    password: process.env.DB_PASS,    //Senha do servidor do banco de dados
    database: process.env.DB_NAME,    //Nome do banco de dados
    host: process.env.DB_HOST,        //Endereço do servidor do banco de dados
    port: process.env.DB_PORT,        //Porta do servidor do banco de dados
    dialect: process.env.DB_DIAL      //Qual tipo de banco de dados está utilizando
};