const { Router } = require("express");
const materiasRoute = new Router();
const Materias = require("../database/models/materias");

// CRIAR
materiasRoute.post("/api/professores", (req, res) => {
    Materias.create(req.body).then(result => {
        res.send(result);
    });
});

// LER
materiasRoute.get("/api/professores", (req, res) => {
    Materias.findAll().then(result => {
        res.send(result);
    });
});

materiasRoute.get("/api/professores/:id", (req, res) => {
    res.send('A desenvolver...');
});

// EDITAR
materiasRoute.patch("/api/professores/:id", (req, res) => {
    res.send('A desenvolver...');
});

// EXCLUIR
materiasRoute.delete("/api/professores/:id", (req, res) => {
    res.send('A desenvolver...');
});

module.exports = professoresRoute;