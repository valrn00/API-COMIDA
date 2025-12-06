const db = require("../database/db");

exports.getPedidos = (req, res) => {
  db.all("SELECT * FROM pedidos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createPedido = (req, res) => {
  const { fecha, total, estado } = req.body;

  db.run(
    `INSERT INTO pedidos (fecha, total, estado) VALUES (?, ?, ?)`,
    [fecha, total, estado],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID, mensaje: "Pedido creado" });
    }
  );
};

exports.agregarDetalle = (req, res) => {
  const { pedido_id, plato_id, cantidad } = req.body;

  db.run(
    `INSERT INTO pedido_detalle (pedido_id, plato_id, cantidad) VALUES (?, ?, ?)`,
    [pedido_id, plato_id, cantidad],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.json({ id: this.lastID, mensaje: "Detalle agregado al pedido" });
    }
  );
};

exports.getDetallesPorPedido = (req, res) => {
  const { pedido_id } = req.params;

  db.all(
    `
      SELECT platos.nombre, platos.precio, pedido_detalle.cantidad
      FROM pedido_detalle
      JOIN platos ON platos.id = pedido_detalle.plato_id
      WHERE pedido_detalle.pedido_id = ?
    `,
    [pedido_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json(rows);
    }
  );
};
