const express = require("express");
const router = express.Router();
const controller = require("../controllers/platoIngredientes.controller");

/**
 * @swagger
 * tags:
 *   name: PlatoIngredientes
 *   description: Relación entre platos e ingredientes
 */

/**
 * @swagger
 * /plato-ingredientes:
 *   get:
 *     summary: Lista relaciones plato-ingrediente
 *     tags: [PlatoIngredientes]
 *     responses:
 *       200:
 *         description: Lista completa
 *         content:
 *           application/json:
 *             example:
 *               - plato_id: 3
 *                 ingrediente_id: 10
 *                 cantidad: 2
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
 *             $ref: "#/components/schemas/PlatoIngrediente"
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
 *         description: Ingredientes asociados
 *         content:
 *           application/json:
 *             example:
 *               - ingrediente: "Tomate"
 *                 cantidad: 1
 */
router.get("/:plato_id", controller.getIngredientesPorPlato);

module.exports = router;
