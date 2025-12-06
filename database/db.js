// database/db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta ABSOLUTA al archivo food.db
const DB_PATH = path.join(__dirname, "food.db");

// Crear conexión
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error("❌ Error al conectar la base de datos:", err.message);
    } else {
        console.log("📦 Base de datos conectada:", DB_PATH);
    }
});

module.exports = db;
