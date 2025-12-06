const db = require("../database/db");

exports.addIngredienteAPlato = (req, res) => {
  const { plato_id, ingrediente_id } = req.body;

  db.run(
    `INSERT INTO plato_ingredientes (plato_id, ingrediente_id) VALUES (?, ?)`,
    [plato_id, ingrediente_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, mensaje: "Ingrediente agregado al plato" });
    }
  );
};

exports.getIngredientesPorPlato = (req, res) => {
  const { plato_id } = req.params;

  db.all(
    `
      SELECT ingredientes.nombre
      FROM plato_ingredientes
      JOIN ingredientes ON ingredientes.id = plato_ingredientes.ingrediente_id
      WHERE plato_ingredientes.plato_id = ?
    `,
    [plato_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
};
