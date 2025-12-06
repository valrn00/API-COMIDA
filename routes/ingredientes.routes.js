const express = require("express");
const router = express.Router();
const controller = require("../controllers/ingredientes.controller");

/**
 * @swagger
 * tags:
 *   name: Ingredientes
 *   description: Endpoints para gestionar ingredientes
 *
 * components:
 *   schemas:
 *     Ingrediente:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         stock:
 *           type: number
 */

/**
 * @swagger
 * /ingredientes:
 *   get:
 *     summary: Obtiene todos los ingredientes
 *     tags: [Ingredientes]
 *     responses:
 *       200:
 *         description: Lista de ingredientes
 */
router.get("/", controller.getIngredientes);

/**
 * @swagger
 * /ingredientes:
 *   post:
 *     summary: Crea un nuevo ingrediente
 *     tags: [Ingredientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingrediente'
 *     responses:
 *       201:
 *         description: Ingrediente creado
 */
router.post("/", controller.createIngrediente);

/**
 * @swagger
 * /ingredientes/{id}:
 *   delete:
 *     summary: Elimina un ingrediente
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Ingrediente eliminado
 */
router.delete("/:id", controller.deleteIngrediente);

module.exports = router;
