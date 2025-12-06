const express = require("express");
const router = express.Router();
const controller = require("../controllers/categorias.controller");

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Endpoints para gestionar categorías
 *
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
 *           type: string
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
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoría creada
 */
router.post("/", controller.createCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Categoría eliminada
 */
router.delete("/:id", controller.deleteCategoria);

module.exports = router;
