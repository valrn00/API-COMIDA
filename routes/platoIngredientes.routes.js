const express = require("express");
const router = express.Router();
const controller = require("../controllers/platoIngredientes.controller");

/**
 * @swagger
 * tags:
 *   name: PlatoIngredientes
 *   description: Relaciones entre platos e ingredientes (N:N)
 *
 * components:
 *   schemas:
 *     PlatoIngrediente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         plato_id:
 *           type: integer
 *         ingrediente_id:
 *           type: integer
 *         cantidad:
 *           type: integer
 */

/**
 * @swagger
 * /plato-ingredientes:
 *   get:
 *     summary: Obtiene todas las relaciones plato-ingrediente
 *     tags: [PlatoIngredientes]
 *     responses:
 *       200:
 *         description: Lista de relaciones
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /plato-ingredientes:
 *   post:
 *     summary: Agrega un ingrediente a un plato
 *     tags: [PlatoIngredientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlatoIngrediente'
 *     responses:
 *       201:
 *         description: Relación creada
 */
router.post("/", controller.create);

/**
 * @swagger
 * /plato-ingredientes/{plato_id}:
 *   get:
 *     summary: Obtiene ingredientes de un plato
 *     tags: [PlatoIngredientes]
 *     parameters:
 *       - in: path
 *         name: plato_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingredientes del plato
 */
router.get("/:plato_id", controller.getIngredientesPorPlato);

module.exports = router;

