const sqlite3 = require('sqlite3'); // Driver de SQLite
const { open } = require('sqlite'); // Envoltorio para manejar la DB
const bcrypt = require('bcryptjs'); // Hasheo de contraseñas
(async function() {
    // 1. Abrir conexión a la DB
    const db = await open({ filename: './food.db', driver: sqlite3.Database });

    // 2. Eliminar todas las tablas (RESET total)
    await db.exec('DROP TABLE IF EXISTS logs; DROP TABLE IF EXISTS platos; DROP TABLE IF EXISTS categories; DROP TABLE IF EXISTS users;');
    console.log('Dropped tables');

    // Nota: El comentario indica que las tablas se volverán a crear al iniciar el servidor (server.js).
    // Sin embargo, este script recrea la tabla de 'users' y el usuario 'admin' inmediatamente.
    // 3. Crear el hash de la contraseña de administrador
    const hashed = await bcrypt.hash('password123', 10);

    // 4. Recrear la tabla de usuarios (necesario para insertar el admin)
    await db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username TEXT UNIQUE NOT NULL, 
            password TEXT NOT NULL, 
            role TEXT NOT NULL DEFAULT 'user', 
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
    `);
    
    // 5. Insertar el usuario administrador
    await db.run(`INSERT INTO users (username,password,role) VALUES (?,?,?)`,
    ['admin', hashed, 'admin']);
    
    console.log('Recreated users with admin/password123');

    // 6. Cerrar la conexión a la base de datos
    await db.close();
})();
