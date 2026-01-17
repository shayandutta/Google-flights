const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flights API",
      version: "1.0.0",
      description:
        "RESTful API for managing airplanes, cities, airports, and flights",
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
      {
        name: "Flights",
        description: "Flight management endpoints",
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
        Flight: {
          type: "object",
          required: [
            "flightNumber",
            "airplaneId",
            "departureAirportId",
            "arrivalAirportId",
            "departureTime",
            "arrivalTime",
            "price",
            "totalSeats",
          ],
          properties: {
            id: {
              type: "integer",
              description: "Auto-generated flight ID",
              example: 1,
            },
            flightNumber: {
              type: "string",
              description: "Flight number",
              example: "UK 808",
            },
            airplaneId: {
              type: "integer",
              description: "ID of the airplane",
              example: 7,
            },
            departureAirportId: {
              type: "string",
              description: "Code of the departure airport",
              example: "MUM",
            },
            arrivalAirportId: {
              type: "string",
              description: "Code of the arrival airport",
              example: "LGB",
            },
            departureTime: {
              type: "string",
              format: "date-time",
              description: "Departure date and time",
              example: "2026-01-20T06:15:00.000Z",
            },
            arrivalTime: {
              type: "string",
              format: "date-time",
              description: "Arrival date and time",
              example: "2026-01-20T07:30:00.000Z",
            },
            price: {
              type: "integer",
              description: "Price of the flight ticket",
              example: 7800,
            },
            boardingGate: {
              type: "string",
              description: "Boarding gate number",
              example: "A12",
            },
            totalSeats: {
              type: "integer",
              description: "Total remaining seats available",
              example: 200,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the flight was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the flight was last updated",
            },
          },
        },
        FlightWithDetails: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1,
            },
            flightNumber: {
              type: "string",
              example: "UK 808",
            },
            airplaneId: {
              type: "integer",
              example: 7,
            },
            departureAirportId: {
              type: "string",
              example: "MUM",
            },
            arrivalAirportId: {
              type: "string",
              example: "LGB",
            },
            departureTime: {
              type: "string",
              format: "date-time",
              example: "2026-01-20T06:15:00.000Z",
            },
            arrivalTime: {
              type: "string",
              format: "date-time",
              example: "2026-01-20T07:30:00.000Z",
            },
            price: {
              type: "integer",
              example: 7800,
            },
            boardingGate: {
              type: "string",
              example: "A12",
            },
            totalSeats: {
              type: "integer",
              example: 200,
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
            airplaneDetails: {
              type: "object",
              description: "Nested airplane information",
              $ref: "#/components/schemas/Airplane",
            },
            departureAirport: {
              type: "object",
              description: "Nested departure airport information with city details",
              properties: {
                id: {
                  type: "integer",
                  example: 1,
                },
                name: {
                  type: "string",
                  example: "Chhatrapati Shivaji Maharaj International Airport",
                },
                code: {
                  type: "string",
                  example: "MUM",
                },
                address: {
                  type: "string",
                  example: "Mumbai, India",
                },
                cityId: {
                  type: "integer",
                  example: 1,
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                },
                cityDetails: {
                  type: "object",
                  description: "City information for departure airport",
                  properties: {
                    id: {
                      type: "integer",
                      example: 1,
                    },
                    name: {
                      type: "string",
                      example: "Mumbai",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
            },
            arrivalAirport: {
              type: "object",
              description: "Nested arrival airport information with city details",
              properties: {
                id: {
                  type: "integer",
                  example: 2,
                },
                name: {
                  type: "string",
                  example: "Long Beach Airport",
                },
                code: {
                  type: "string",
                  example: "LGB",
                },
                address: {
                  type: "string",
                  example: "Long Beach, USA",
                },
                cityId: {
                  type: "integer",
                  example: 2,
                },
                createdAt: {
                  type: "string",
                  format: "date-time",
                },
                updatedAt: {
                  type: "string",
                  format: "date-time",
                },
                cityDetails: {
                  type: "object",
                  description: "City information for arrival airport",
                  properties: {
                    id: {
                      type: "integer",
                      example: 2,
                    },
                    name: {
                      type: "string",
                      example: "Long Beach",
                    },
                    createdAt: {
                      type: "string",
                      format: "date-time",
                    },
                    updatedAt: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
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
