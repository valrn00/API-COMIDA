// Dependencias
const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); // Envoltorio para SQLite
const { body, param, query, validationResult } = require('express-validator'); // Validación
const bcrypt = require('bcryptjs'); // Hasheo de contraseñas
const jwt = require('jsonwebtoken'); // Tokens de autenticación
const morgan = require('morgan'); // Registro de peticiones (logging)
const helmet = require('helmet'); // Seguridad (cabeceras HTTP)
const cors = require('cors'); // CORS
const swaggerJsdoc = require('swagger-jsdoc'); // Docs
const swaggerUi = require('swagger-ui-express'); // Docs
require('dotenv').config(); // Variables de entorno

// Variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_muy_seguro_123';
const PORT = process.env.PORT || 3000;
(async () => {
    // 1. Abrir conexión a la DB
    const db = await open({ filename: './food.db', driver: sqlite3.Database });

    // 2. Creación de tablas
    await db.exec(`
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );
        CREATE TABLE IF NOT EXISTS platos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            precio REAL NOT NULL,
            imagen TEXT,
            categoria_id INTEGER,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(categoria_id) REFERENCES categories(id) ON DELETE SET NULL
        );
        CREATE TABLE IF NOT EXISTS logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            action TEXT NOT NULL,
            payload TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // 3. Seeding (poblamiento inicial si es necesario)
    const categoriesCount = await db.get(`SELECT COUNT(*) as total FROM categories`);
    if (categoriesCount.total === 0) {
        // ... (insertar categorías por defecto)
    }
    const usersCount = await db.get(`SELECT COUNT(*) as total FROM users`);
    if (usersCount.total === 0) {
        // ... (crear usuario admin por defecto)
        const hashedPassword = await bcrypt.hash('password123', 10);
        await db.run(`INSERT INTO users (username,password,role) VALUES (?,?,?)`, ['admin', hashedPassword, 'admin']);
        console.log('Seed: admin/password123 creado');
    }
    const platosCount = await db.get(`SELECT COUNT(*) as total FROM platos`);
    if (platosCount.total === 0) {
        // ... (insertar platos de ejemplo)
    }

    // Inicialización de Express y Middlewares globales
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json({ limit: '2mb' }));
    app.use(morgan('dev')); // Logger para peticiones

    // 1. Función para envolver async/await y manejar errores
    function asyncHandler(fn) {
        return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
    }

    // 2. Registro de acciones en la tabla 'logs'
    function logAction(action, payload = null) {
        db.run(`INSERT INTO logs (action, payload) VALUES (?,?)`, [action, payload ? JSON.stringify(payload) : null]).catch(()=>{});
    }

    // 3. Middleware de Autenticación (Verificar JWT)
    function authenticateToken(req, res, next) {
        const auth = req.headers['authorization'];
        // ... (Lógica para extraer y verificar el token JWT)
        const parts = auth.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Formato de token inválido' });
        const token = parts[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ error: 'Token inválido' });
            req.user = user; next();
        });
    }

    // 4. Middleware de Autorización (Verificar Rol)
    function authorizeRole(role) {
        return (req, res, next) => {
            if (!req.user) return res.status(401).json({ error: 'No autenticado' });
            // Permite el rol específico o 'admin'
            if (req.user.role !== role && req.user.role !== 'admin') return res.status(403).json({ error: 'No autorizado' });
            next();
        };
    }

    // 5. Verificación de errores de express-validator
    function checkValidationResult(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    }
    // POST /auth/register
    app.post('/auth/register',
        // Validación: username (min 3), password (min 6)
        body('username').isString().isLength({ min: 3 }),
        body('password').isLength({ min: 6 }),
        asyncHandler(async (req, res) => {
            // ... (Lógica de registro, hasheo de contraseña, inserción en DB)
        })
    );

    // POST /auth/login
    app.post('/auth/login',
        body('username').isString(),
        body('password').isString(),
        asyncHandler(async (req, res) => {
            // ... (Lógica de login, verificación de contraseña, generación de JWT)
        })
    );
    // GET /categorias (Público)
    app.get('/categorias', asyncHandler(async (req, res) => {
        const rows = await db.all(`SELECT * FROM categories ORDER BY name`);
        res.json(rows);
    }));

    // POST /categorias (Solo Admin)
    app.post('/categorias', authenticateToken, authorizeRole('admin'),
        body('name').isString().isLength({ min: 2 }), asyncHandler(async (req, res) => {
        // ... (Lógica para crear categoría)
    }));
    // GET /platos (Listado con filtros y paginación)
    app.get('/platos', [
        // Validaciones para filtros, orden y paginación
        query('q').optional().isString(),
        query('categoria').optional().isInt(),
        // ... otras validaciones
    ], asyncHandler(async (req, res) => {
        // ... (Lógica para construir la consulta SQL dinámica con WHERE, ORDER BY, LIMIT y OFFSET)
        const whereConditions = []; const queryParams = [];
        // ...
        const whereClause = whereConditions.length ? `WHERE ${whereConditions.join(' AND ')}` : '';
        // ... (Ejecución de consulta y respuesta con metadatos de paginación)
    }));

    // GET /platos/:id (Detalle de un plato)
    app.get('/platos/:id', param('id').isInt({ gt: 0 }), asyncHandler(async (req, res) => {
        // ... (Buscar plato por ID)
    }));

    // POST /platos (Crear - Solo Admin)
    app.post('/platos', authenticateToken, authorizeRole('admin'),
        // ... (Validaciones y lógica de inserción)
    );

    // PUT /platos/:id (Actualizar - Solo Admin)
    app.put('/platos/:id', authenticateToken, authorizeRole('admin'),
        // ... (Validaciones y lógica de actualización)
    );

    // DELETE /platos/:id (Eliminar - Solo Admin)
    app.delete('/platos/:id', authenticateToken, authorizeRole('admin'),
        // ... (Lógica de eliminación)
    );
    // GET /stats
    app.get('/stats', asyncHandler(async (req, res) => {
        // ... (Cálculos de estadísticas: total, promedio de precio, plato más caro, etc.)
    }));

    // GET /logs (Solo Admin)
    app.get('/logs', authenticateToken, authorizeRole('admin'),
        asyncHandler(async (req, res) => {
        // ... (Obtener los últimos 200 logs)
    }));

    // GET /health (Chequeo de estado)
    app.get('/health', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

    // GET / (Ruta raíz - Redirige a Swagger)
    app.get('/', (req, res) => res.redirect('/api-docs'));
    
    // Configuración de Swagger
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Food API Pro',
                version: '1.0.0',
                description: 'API profesional de comidas con Node.js + SQLite'
            },
            servers: [
                {
                    url: `http://localhost:${PORT}`,
                    description: 'Servidor Local'
                }
            ]
        },
        apis: []
    };
    const swaggerSpec = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Manejador de errores global
    app.use((err, req, res, next) => {
        console.error(err);
        if (res.headersSent) return next(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    });

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Food API Pro corriendo en http://localhost:${PORT}`);
        console.log(`Docs Swagger: http://localhost:${PORT}/api-docs`);
    });
})(); // Fin de la función asíncrona principal