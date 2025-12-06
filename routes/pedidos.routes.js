const express = require("express");
const router = express.Router();
const controller = require("../controllers/pedidos.controller");

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para gestionar pedidos
 *
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         cliente:
 *           type: string
 *         total:
 *           type: number
 *         estado:
 *           type: string
 */

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtiene todos los pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/", controller.getPedidos);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido creado
 */
router.post("/", controller.createPedido);

/**
 * @swagger
 * /pedidos/detalle:
 *   post:
 *     summary: Agrega detalle a un pedido (plato y cantidad)
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pedido_id:
 *                 type: integer
 *               plato_id:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Detalle agregado
 */
router.post("/detalle", controller.agregarDetalle);

/**
 * @swagger
 * /pedidos/detalle/{pedido_id}:
 *   get:
 *     summary: Obtiene detalle de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: pedido_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del pedido
 */
router.get("/detalle/:pedido_id", controller.getDetallesPorPedido);

module.exports = router;
