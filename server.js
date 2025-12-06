const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const platosRoutes = require("./routes/platos.routes");

const app = express();
app.use(cors());
app.use(express.json());

// --- Swagger Config ---
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food API",
      version: "1.0.0",
      description: "Documentación de API para Platos, Categorías e Ingredientes",
    },
  },
  apis: ["./routes/*.js"], // IMPORTANTE
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- Rutas ---
app.use("/platos", platosRoutes);

// --- Init ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📄 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
