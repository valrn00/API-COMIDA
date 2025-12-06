const express = require("express");
const router = express.Router();
const controller = require("../controllers/platos.controller");

/**
 * @swagger
 * tags:
 *   name: Platos
 *   description: Endpoints para gestión de platos
 */

/**
 * @swagger
 * /platos:
 *   get:
 *     summary: Lista todos los platos
 *     tags: [Platos]
 *     responses:
 *       200:
 *         description: Lista de platos
 *         content:
 *           application/json:
 *             example:
 *               - id: 3
 *                 nombre: "Pizza Margarita"
 *                 precio: 32000
 *                 categoria_id: 1
 */
router.get("/", controller.getPlatos);

/**
 * @swagger
 * /platos/{id}:
 *   get:
 *     summary: Obtiene un plato por ID
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plato encontrado
 */
router.get("/:id", controller.getPlatoById);

/**
 * @swagger
 * /platos:
 *   post:
 *     summary: Crea un nuevo plato
 *     tags: [Platos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Plato"
 *     responses:
 *       201:
 *         description: Plato creado
 */
router.post("/", controller.createPlato);

/**
 * @swagger
 * /platos/{id}:
 *   put:
 *     summary: Actualiza un plato
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Plato"
 *     responses:
 *       200:
 *         description: Plato actualizado
 */
router.put("/:id", controller.updatePlato);

/**
 * @swagger
 * /platos/{id}:
 *   delete:
 *     summary: Elimina un plato
 *     tags: [Platos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Plato eliminado
 */
router.delete("/:id", controller.deletePlato);

module.exports = router;
