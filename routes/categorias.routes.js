const express = require("express");
const router = express.Router();
const controller = require("../controllers/categorias.controller");

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Endpoints para gestionar categorías
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 nombre: "Postres"
 *                 descripcion: "Dulces y tortas"
 *               - id: 2
 *                 nombre: "Bebidas"
 *                 descripcion: "Frías y calientes"
 */
router.get("/", controller.getCategorias);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Categoria"
 *     responses:
 *       201:
 *         description: Categoría creada
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               nombre: "Entradas"
 *               descripcion: "Platos para iniciar"
 */
router.post("/", controller.createCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 */
router.delete("/:id", controller.deleteCategoria);

module.exports = router;
