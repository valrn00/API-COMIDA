const db = require("../database/db");

const Platos = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT p.*, c.nombre AS categoria 
         FROM platos p 
         LEFT JOIN categorias c ON c.id = p.categoria_id`,
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO platos (nombre, precio, categoria_id)
         VALUES (?, ?, ?)`,
        [data.nombre, data.precio, data.categoria_id],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  }
};

module.exports = Platos;
