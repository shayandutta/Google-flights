const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flights API",
      version: "1.0.0",
      description:
        "RESTful API for managing airplanes and cities in a flights system",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Airplanes",
        description: "Airplane management endpoints",
      },
      {
        name: "Cities",
        description: "City management endpoints",
      },
      {
        name: "Airports",
        description: "Airport management endpoints",
      },
    ],
    components: {
      schemas: {
        Airplane: {
          type: "object",
          required: ["modelNumber", "capacity"],
          properties: {
            id: {
              type: "integer",
              description: "Auto-generated airplane ID",
              example: 1,
            },
            modelNumber: {
              type: "string",
              description: "Model number of the airplane - alphanumeric only",
              example: "Boeing 737",
            },
            capacity: {
              type: "integer",
              description: "Passenger capacity - min 50, max 1000",
              minimum: 50,
              maximum: 1000,
              example: 189,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the airplane was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the airplane was last updated",
            },
          },
        },
        City: {
          type: "object",
          required: ["name"],
          properties: {
            id: {
              type: "integer",
              description: "Auto-generated city ID",
              example: 1,
            },
            name: {
              type: "string",
              description: "Name of the city",
              example: "Mumbai",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the city was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the city was last updated",
            },
          },
        },
        Airport: {
          type: "object",
          required: ["name", "code", "cityId"],
          properties: {
            id: {
              type: "integer",
              description: "Auto-generated airport ID",
              example: 1,
            },
            name: {
              type: "string",
              description: "Name of the airport",
              example: "Kempegowda International Airport",
            },
            code: {
              type: "string",
              description: "Airport code (IATA code) - unique identifier",
              example: "BLR",
            },
            address: {
              type: "string",
              description: "Address of the airport",
              example: "Bangalore, India",
            },
            cityId: {
              type: "integer",
              description: "ID of the city where the airport is located",
              example: 2,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the airport was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the airport was last updated",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              example: "Successfully completed the request",
            },
            data: {
              type: "object",
            },
            error: {
              type: "object",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Something went wrong",
            },
            data: {
              type: "object",
            },
            error: {
              type: "object",
              properties: {
                statusCode: {
                  type: "integer",
                  example: 400,
                },
                explanation: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  example: ["Validation error message"],
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
