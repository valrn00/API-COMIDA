const db = require("../database/db");

exports.getPlatos = (req, res) => {
    db.all("SELECT * FROM platos", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getPlatoById = (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM platos WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

exports.createPlato = (req, res) => {
    const { nombre, descripcion, precio, categoria_id } = req.body;
    db.run(
        "INSERT INTO platos (nombre, descripcion, precio, categoria_id) VALUES (?, ?, ?, ?)",
        [nombre, descripcion, precio, categoria_id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, nombre, descripcion, precio, categoria_id });
        }
    );
};

exports.updatePlato = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria_id } = req.body;

    db.run(
        "UPDATE platos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ? WHERE id = ?",
        [nombre, descripcion, precio, categoria_id, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Plato actualizado" });
        }
    );
};

exports.deletePlato = (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM platos WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Plato eliminado" });
    });
};
