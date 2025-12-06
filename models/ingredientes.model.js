const db = require("../database/db");

const Ingrediente = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM ingredientes", (err, rows) =>
        err ? reject(err) : resolve(rows)
      );
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO ingredientes (nombre, stock) VALUES (?, ?)",
        [data.nombre, data.stock],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  }
};

module.exports = Ingrediente;
