const db = require("../database/db");

const Pedidos = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM pedidos", (err, rows) =>
        err ? reject(err) : resolve(rows)
      );
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO pedidos (cliente, total, estado)
         VALUES (?, ?, ?)`,
        [data.cliente, data.total, data.estado],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  }
};

module.exports = Pedidos;
