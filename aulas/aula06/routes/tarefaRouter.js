const express = require("express");
const controller = require("../controllers/tarefaController");

const router = express.Router();

router.get("/", controller.listarTarefas);

router.post("/", controller.criarTarefa);

router.get("/:id", controller.obterTarefa);

router.put("/:id", controller.removerTarefa);

router.delete("/:id", controller.removerTarefa);

module.exports = router;
