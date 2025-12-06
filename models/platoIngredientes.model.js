const db = require("../database/db");

const PlatoIngredientes = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT pi.id, p.nombre AS plato, i.nombre AS ingrediente, pi.cantidad
         FROM plato_ingredientes pi
         JOIN platos p ON p.id = pi.plato_id
         JOIN ingredientes i ON i.id = pi.ingrediente_id`,
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO plato_ingredientes (plato_id, ingrediente_id, cantidad)
         VALUES (?, ?, ?)`,
        [data.plato_id, data.ingrediente_id, data.cantidad],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  }
};

module.exports = PlatoIngredientes;
