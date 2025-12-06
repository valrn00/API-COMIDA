const db = require("../models/db.js");
const seedData = require("./seedData");

async function seed() {
  try {
    console.log("⏳ Insertando datos de ejemplo...");

    await new Promise((resolve, reject) => {
      db.run("DELETE FROM categorias", err => (err ? reject(err) : resolve()));
    });
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM ingredientes", err => (err ? reject(err) : resolve()));
    });
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM pedidos", err => (err ? reject(err) : resolve()));
    });

    // Insertar categorías
    for (const item of seedData.categorias) {
      await new Promise((resolve, reject) => {
        db.run("INSERT INTO categorias (nombre) VALUES (?)",
          [item.nombre],
          err => (err ? reject(err) : resolve())
        );
      });
    }

    // Insertar ingredientes
    for (const item of seedData.ingredientes) {
      await new Promise((resolve, reject) => {
        db.run("INSERT INTO ingredientes (nombre, stock) VALUES (?, ?)",
          [item.nombre, item.stock],
          err => (err ? reject(err) : resolve())
        );
      });
    }

    // Insertar pedidos
    for (const item of seedData.pedidos) {
      await new Promise((resolve, reject) => {
        db.run("INSERT INTO pedidos (cliente, total) VALUES (?, ?)",
          [item.cliente, item.total],
          err => (err ? reject(err) : resolve())
        );
      });
    }

    console.log("✔ Datos insertados correctamente.");
  } catch (error) {
    console.error("❌ Error ejecutando el seed:", error);
  }
}

seed();
