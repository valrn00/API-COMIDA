module.exports = {
  components: {
    schemas: {
      Categoria: {
        type: "object",
        properties: {
          nombre: { type: "string", example: "Postres" },
          descripcion: { type: "string", example: "Dulces y tortas" }
        },
        required: ["nombre"]
      },

      Ingrediente: {
        type: "object",
        properties: {
          nombre: { type: "string", example: "Tomate" },
          stock: { type: "integer", example: 50 }
        },
        required: ["nombre", "stock"]
      },

      Plato: {
        type: "object",
        properties: {
          nombre: { type: "string", example: "Pizza Margarita" },
          precio: { type: "number", example: 32000 },
          categoria_id: { type: "integer", example: 1 }
        },
        required: ["nombre", "precio", "categoria_id"]
      },

      Pedido: {
        type: "object",
        properties: {
          cliente: { type: "string", example: "Juan Pérez" },
          total: { type: "number", example: 45000 },
          estado: { type: "string", example: "pendiente" }
        },
        required: ["cliente", "total", "estado"]
      },

      PlatoIngrediente: {
        type: "object",
        properties: {
          plato_id: { type: "integer", example: 3 },
          ingrediente_id: { type: "integer", example: 10 },
          cantidad: { type: "integer", example: 2 }
        },
        required: ["plato_id", "ingrediente_id", "cantidad"]
      }
    }
  }
};
