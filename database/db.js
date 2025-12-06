const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.resolve(__dirname, "database.sqlite");  // << STRING REAL

console.log("Usando base de datos en:", DB_PATH);

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error al conectar a SQLite:", err.message);
    return;
  }
  console.log("Conexión exitosa a la base de datos SQLite");
});

module.exports = db;
