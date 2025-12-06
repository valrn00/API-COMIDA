const db = require("../database/db");

exports.getCategorias = (req, res) => {
  db.all("SELECT * FROM categorias", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.createCategoria = (req, res) => {
  const { nombre, descripcion } = req.body;

  db.run(
    `INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)`,
    [nombre, descripcion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, mensaje: "Categoría creada" });
    }
  );
};
