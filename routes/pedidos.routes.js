const express = require("express");
const router = express.Router();
const controller = require("../controllers/pedidos.controller");

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para gestión de pedidos
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
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 cliente: "Juan"
 *                 total: 50000
 *                 estado: "pendiente"
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
 *             $ref: "#/components/schemas/Pedido"
 *     responses:
 *       201:
 *         description: Pedido creado
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               cliente: "Ana"
 *               total: 32000
 *               estado: "pendiente"
 */
router.post("/", controller.createPedido);

/**
 * @swagger
 * /pedidos/detalle:
 *   post:
 *     summary: Agrega un plato a un pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             pedido_id: 2
 *             plato_id: 4
 *             cantidad: 2
 *     responses:
 *       201:
 *         description: Detalle agregado
 */
router.post("/detalle", controller.agregarDetalle);

/**
 * @swagger
 * /pedidos/detalle/{pedido_id}:
 *   get:
 *     summary: Obtiene los detalles de un pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: pedido_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de detalles del pedido
 *         content:
 *           application/json:
 *             example:
 *               - plato: "Pizza Margarita"
 *                 cantidad: 2
 *                 subtotal: 64000
 */
router.get("/detalle/:pedido_id", controller.getDetallesPorPedido);

module.exports = router;
