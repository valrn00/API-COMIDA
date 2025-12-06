const db = require("../database/db");

exports.getIngredientes = (req, res) => {
  db.all("SELECT * FROM ingredientes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createIngrediente = (req, res) => {
  const { nombre } = req.body;

  db.run(
    `INSERT INTO ingredientes (nombre) VALUES (?)`,
    [nombre],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, mensaje: "Ingrediente creado" });
    }
  );
};
