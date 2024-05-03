const { Router } = require("express");
const cursosRoute = new Router();
const Cursos = require("../database/models/cursos");

// CRIAR
cursosRoute.post("/api/cursos", (req, res) => {
    Cursos.create(req.body).then(result => {
        res.send(result);
    });
});

// LER
cursosRoute.get("/api/cursos", (req, res) => {
    Cursos.findAll().then(result => {
        res.send(result);
    });
});

cursosRoute.get("/api/cursos/{id}", (req, res) => {
    const data = {
        query: req.query,
        param: req.params
    }

    res.send(data);
});

// EDITAR
cursosRoute.patch("/api/cursos/:id", (req, res) => {
    res.send('A desenvolver...');
});

// EXCLUIR
cursosRoute.delete("/api/cursos/:id", (req, res) => {
    res.send('A desenvolver...');
});

module.exports = cursosRoute;