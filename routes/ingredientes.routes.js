const express = require("express");
const router = express.Router();
const controller = require("../controllers/ingredientes.controller");

/**
 * @swagger
 * tags:
 *   name: Ingredientes
 *   description: Endpoints para gestionar ingredientes
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
const express = require("express");
const router = express.Router();
const controller = require("../controllers/ingredientes.controller");

/**
 * @swagger
 * tags:
 *   name: Ingredientes
 *   description: Endpoints para gestionar ingredientes
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
 *         content:
 *           application/json:
 *             example:
 *               - id: 10
 *                 nombre: "Harina"
 *                 stock: 40
 *               - id: 11
 *                 nombre: "Queso"
 *                 stock: 25
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
 *             $ref: "#/components/schemas/Ingrediente"
 *     responses:
 *       201:
 *         description: Ingrediente creado
 *         content:
 *           application/json:
 *             example:
 *               id: 12
 *               nombre: "Tomate"
 *               stock: 60
 */
router.post("/", controller.createIngrediente);

/**
 * @swagger
 * /ingredientes/{id}:
 *   delete:
 *     summary: Elimina un ingrediente por ID
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Ingrediente eliminado
 */
router.delete("/:id", controller.deleteIngrediente);

module.exports = router;
