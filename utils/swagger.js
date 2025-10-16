const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: process.env.SWAGGER_URL || 'http://localhost:8080',
      },
    ],

    // ✅ Global security scheme (Authorize button appears)
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional: just for UI hints
        },
      },
    },

    // ✅ Apply bearerAuth globally to all routes
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // 👇 Path to your JSDoc comments
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
