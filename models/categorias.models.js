const db = require("../database/db");

const Categoria = {
  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM categorias", (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO categorias (nombre) VALUES (?)",
        [data.nombre],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...data });
        }
      );
    });
  }
};

module.exports = Categoria;
