const { Router } = require("express");
const professoresRoute = new Router();
const { Professores } = require("../database/models");
const utils = require("../utils");

// CRIAR
professoresRoute.post("/api/professores", async (req, res) => {
    const data = req.body;
    data.nascimento = utils.converteStrToData(req.body.nascimento);

    const professor = await Professores.create(data);
    if (professor) {
        res.status(201); //Created
        res.send(professor);
    } else {
        res.status(400); //Bad Request
        res.send({ mensagem: `Informação inválida ou incompleta.` });
    }
});

// LER
// tudo ou query
professoresRoute.get("/api/professores", async (req, res) => {
    const query = req.query;
    try {
        const professores = await Professores.findAll({ where: query });
        if (professores)
            res.send(professores);
        else
            res.status(404).send({ mensagem: `Nenhum professor encontrado.` });

    } catch (error) {
        res
            .status(404)
            .send(error);
    }
});

// único por ID
professoresRoute.get("/api/professores/:id", async (req, res) => {
    try {
        const professor = await Professores.findByPk(req.params.id);
        if (professor)
            res.send(professor);
        else
            res
                .status(404) //Not Found
                .send({ mensagem: `Professor ${req.params.id} não encontrado.` });

    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Professor ${req.params.id} não encontrado.` });
    }
});

// EDITAR
// update parcial - patch
professoresRoute.patch("/api/professores/:id", async (req, res) => {

    const data = req.body;
    if (req.body.nascimento)
        data.nascimento = utils.converteStrToData(req.body.nascimento);



    let professor = {};
    let alterar = {};

    //Verifica se existe
    try {
        professor = await Professores.findByPk(req.params.id);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Professor ${req.params.id} não encontrado.` });
    }


    //Monta a estrutura dos campos que serão alterados
    for (campo in data) {
        alterar[campo] = data[campo];
    }

    //Altera
    try {
        await professor.update(alterar);
        res.status(200).send(professor);
    } catch (error) {
        res
            .status(40) //Not Found
            .send({ mensagem: `Professor ${req.params.id} não alterado.` });
    }

});

// updates completo - put
professoresRoute.put("/api/professores/:id", async (req, res) => {

    const data = req.body;
    if (req.body.nascimento)
        data.nascimento = utils.converteStrToData(req.body.nascimento);

    let professor = {};
    let alterar = {};
    //Verifica se existe
    try {
        professor = await Professores.findByPk(req.params.id);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Professor ${req.params.id} não encontrado.` });
    }

    //Monta a estrutura dos campos que serão alterados
    for (campoModelo in Professores.getAttributes()) {
        if (campoModelo != 'id' &&
            campoModelo != 'createdAt' &&
            campoModelo != 'updatedAt') {
            alterar[campoModelo] = data[campoModelo] ? data[campoModelo] : '';
        }
    }

    //Altera
    try {
        await professor.update(alterar);
        res.status(200).send(professor);
    } catch (error) {
        res
            .status(40) //Not Found
            .send({ mensagem: `Professor ${req.params.id} não alterado.` });
    }

});

// EXCLUIR
professoresRoute.delete("/api/professores/:id", async (req, res) => {
    try {
        const professor = await Professores.findByPk(req.params.id);
        professor.destroy();
        res.status(200).send(professor);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Professor ${req.params.id} não encontrado.` });
    }
});

module.exports = professoresRoute;