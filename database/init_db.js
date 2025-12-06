require("dotenv").config();
const db = require("./db");

db.serialize(() => {

  console.log("🛠️ Creando tablas...");

  db.run(`
    CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS platos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      precio REAL NOT NULL,
      categoria_id INTEGER,
      FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ingredientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS plato_ingredientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plato_id INTEGER,
      ingrediente_id INTEGER,
      FOREIGN KEY (plato_id) REFERENCES platos(id),
      FOREIGN KEY (ingrediente_id) REFERENCES ingredientes(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fecha TEXT NOT NULL,
      total REAL NOT NULL,
      estado TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pedido_detalle (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id INTEGER,
      plato_id INTEGER,
      cantidad INTEGER NOT NULL,
      FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
      FOREIGN KEY (plato_id) REFERENCES platos(id)
    )
  `);

});

console.log("✅ Tablas creadas correctamente");
db.close();
