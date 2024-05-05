const { Router } = require("express");
const cursosRoute = new Router();
const { Cursos } = require("../database/models");

// CRIAR
cursosRoute.post("/api/cursos", async (req, res) => {
    const data = req.body;
    try {
        const curso = await Cursos.create(data);
        if (curso) {
            res.status(201); //Created
            res.send(curso);
        } else {
            res.status(400); //Bad Request
            res.send({ mensagem: `Informação inválida ou incompleta.` });
        }
    } catch (error) {
        res
            .status(404)
            .send(error);
    }
});

// LER
// tudo ou query
cursosRoute.get("/api/cursos", async (req, res) => {
    const query = req.query;
    try {
        const cursos = await Cursos.findAll({ where: query });
        res.send(cursos);
    } catch (error) {
        res
            .status(404)
            .send(error);
    }
});

// único por ID
cursosRoute.get("/api/cursos/:id", async (req, res) => {
    try {
        const curso = await Cursos.findByPk(req.params.id);
        res.send(curso);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Curso ${req.params.id} não encontrado.` });
    }
});

// EXCLUIR
cursosRoute.delete("/api/cursos/:id", async (req, res) => {
    try {
        const curso = await Cursos.findByPk(req.params.id);
        curso.destroy();
        res.status(200).send(curso);
    } catch (error) {
        res
            .status(404) //Not Found
            .send({ mensagem: `Curso ${req.params.id} não encontrado.` });
    }
});

module.exports = cursosRoute;