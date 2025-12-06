const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./food.db");

db.serialize(() => {
  console.log("Creando tablas...");

  db.run(`CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS platos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio REAL NOT NULL,
    categoria_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ingredientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente TEXT NOT NULL,
    total REAL NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS pedido_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER,
    plato_id INTEGER,
    cantidad INTEGER,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (plato_id) REFERENCES platos(id)
  )`);

  console.log("Insertando datos iniciales...");

  // Categorías
  db.run(`INSERT INTO categorias (nombre, descripcion) VALUES
    ('Bebidas', 'Bebidas frías y calientes'),
    ('Comidas rápidas', 'Platos rápidos preparados al instante'),
    ('Postres', 'Opciones dulces para finalizar tu comida')
  `);

  // Platos
  db.run(`INSERT INTO platos (nombre, descripcion, precio, categoria_id) VALUES
    ('Pizza', 'Pizza con queso y pepperoni', 25.000, 2),
    ('Hamburguesa', 'Hamburguesa doble carne', 18.000, 2),
    ('Milo frío', 'Bebida dulce con chocolate', 6.000, 1),
    ('Helado', 'Helado de vainilla con salsa de chocolate', 8.000, 3)
  `);

  // Ingredientes
  db.run(`INSERT INTO ingredientes (nombre) VALUES
    ('Queso'),
    ('Pan'),
    ('Chocolate'),
    ('Carne'),
    ('Vainilla')
  `);

  // Pedido de prueba
  db.run(`INSERT INTO pedidos (cliente, total) VALUES
    ('Juan Pérez', 43.000)
  `);

  // Items del pedido
  db.run(`INSERT INTO pedido_items (pedido_id, plato_id, cantidad) VALUES
    (1, 1, 1),  -- 1 pizza
    (1, 3, 1)   -- 1 Milo
  `);

  console.log("Base de datos inicializada con éxito.");
});

db.close();
