const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerComponents = require("./swagger/components"); 
// <-- Aquí sí se importa, FUERA del objeto definition

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food API",
      version: "1.0.0",
      description: "API para gestionar platos, categorías, ingredientes y pedidos",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    components: swaggerComponents, 
    // <-- AQUÍ inyectas tus schemas, parámetros, ejemplos, etc.
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger listo en http://localhost:3000/api-docs");
}

module.exports = swaggerDocs;
