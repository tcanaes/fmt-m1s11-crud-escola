const { Router } = require("express");
const materiasRoute = new Router();
const { Materias } = require("../database/models");

// CRIAR
materiasRoute.post("/api/materias", async (req, res) => {

    const materia = await Materias.create(req.body);
    if (materia) {
        res.status(201); //Created
        res.send(materia);
    } else {
        res.status(400); //Bad Request
        res.send({ mensagem: `Informação inválida ou incompleta.` });
    }
});

// LER
// tudo ou query
materiasRoute.get("/api/materias", async (req, res) => {
    const query = req.query;
    try {
        const materias = await Materias.findAll({ where: query });
        res.send(materias);

    } catch (error) {
        res
            .status(404)
            .send(error);
    }
});

// único por ID
materiasRoute.get("/api/materias/:id", async (req, res) => {
    try {
        const materia = await Materias.findByPk(req.params.id);
        res.send(materia);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Materia ${req.params.id} não encontrada.` });
    }
});

// EDITAR
// update parcial - patch
materiasRoute.patch("/api/materias/:id", async (req, res) => {

    const data = req.body;
    const materia = {};
    const alterar = {};

    //Verifica se existe
    try {
        materia = await Materias.findByPk(req.params.id);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Materia ${req.params.id} não encontrada.` });
    }

    //Monta a estrutura dos campos que serão alterados
    for (campo in data) {
        alterar[campo] = data[campo];
    }

    //Altera
    try {
        await materia.update(alterar);
        res.status(200).send(materia);
    } catch (error) {
        res
            .status(40) //Not Found
            .send({ mensagem: `Materia ${req.params.id} não alterada.` });
    }

});

// updates completo - put
materiasRoute.put("/api/materias/:id", async (req, res) => {

    const data = req.body;
    const materia = {};
    const alterar = {};
    //Verifica se existe
    try {
        materia = await Materias.findByPk(req.params.id);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Materia ${req.params.id} não encontrada.` });
    }

    //Monta a estrutura dos campos que serão alterados
    for (campoModelo in Materias.getAttributes()) {
        if (campoModelo != 'id' &&
            campoModelo != 'createdAt' &&
            campoModelo != 'updatedAt') {
            alterar[campoModelo] = data[campoModelo] ? data[campoModelo] : '';
        }
    }

    //Altera
    try {
        await materia.update(alterar);
        res.status(200).send(materia);
    } catch (error) {
        res
            .status(40) //Not Found
            .send({ mensagem: `Materia ${req.params.id} não alterada.` });
    }

});

// EXCLUIR
materiasRoute.delete("/api/materias/:id", async (req, res) => {
    try {
        const materia = await Materias.findByPk(req.params.id);
        materia.destroy();
        res.status(200).send(materia);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Materia ${req.params.id} não encontrada.` });
    }
});

module.exports = materiasRoute;