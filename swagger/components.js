module.exports = {
  schemas: {
    Categoria: {
      type: "object",
      properties: {
        id: { type: "integer", example: 1 },
        nombre: { type: "string", example: "Postres" },
        descripcion: { type: "string", example: "Dulces y tortas" },
      },
    },

    Ingrediente: {
      type: "object",
      properties: {
        id: { type: "integer", example: 10 },
        nombre: { type: "string", example: "Harina" },
        stock: { type: "number", example: 40 },
      },
    },

    Pedido: {
      type: "object",
      properties: {
        id: { type: "integer", example: 5 },
        cliente: { type: "string", example: "Juan Pérez" },
        total: { type: "number", example: 55000 },
        estado: { type: "string", example: "pendiente" },
      },
    },

    PlatoIngrediente: {
      type: "object",
      properties: {
        id: { type: "integer", example: 30 },
        plato_id: { type: "integer", example: 4 },
        ingrediente_id: { type: "integer", example: 10 },
        cantidad: { type: "integer", example: 2 },
      },
    },

    Plato: {
      type: "object",
      properties: {
        id: { type: "integer", example: 3 },
        nombre: { type: "string", example: "Pizza Margarita" },
        precio: { type: "number", example: 32000 },
        categoria_id: { type: "integer", example: 1 },
      },
    },
  },
};
