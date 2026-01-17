# Flights API - Project Documentation

## 📚 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Layers](#architecture--layers)
3. [Project Structure](#project-structure)
4. [Request & Response Flow](#request--response-flow)
5. [Error Handling](#error-handling)
6. [Key Classes & Utilities](#key-classes--utilities)
7. [API Endpoints](#api-endpoints)
8. [Getting Started](#getting-started)

---

## 🎯 Project Overview

A **RESTful API** for managing flights, airplanes, airports, and cities built with **Node.js**, **Express**, and **Sequelize ORM**. The project follows a **layered architecture** pattern with clean separation of concerns.

### Features:
- CRUD operations for Airplanes, Cities, Airports, and Flights
- Advanced flight filtering (by trips, price, date, travellers)
- Flight sorting (by multiple fields)
- Swagger API documentation
- Standardized error handling and responses
- Model-level and middleware-level validation

---

## 🏗️ Architecture & Layers

The project follows a **4-layer architecture**:

```
Route → Middleware → Controller → Service → Repository → Model → Database
```

### Layer Responsibilities:

| Layer | Responsibility | HTTP-Aware? |
|-------|---------------|-------------|
| **Route** | Defines API endpoints | ✅ Yes |
| **Middleware** | Validates incoming requests | ✅ Yes |
| **Controller** | Handles HTTP requests/responses | ✅ Yes |
| **Service** | Business logic | ❌ No |
| **Repository** | Database operations | ❌ No |
| **Model** | Database schema & validation | ❌ No |

**Key Principle:** Service and Repository layers are HTTP-agnostic (can be used in CLI, background jobs, etc.)

---

## 📁 Project Structure

```
flights/
├── src/
│   ├── index.js                    # Entry point, Express app setup
│   ├── config/                     # Configuration files
│   │   ├── server-config.js       # Server settings
│   │   ├── logger-config.js       # Logging setup
│   │   └── swagger-config.js       # Swagger documentation config
│   │
│   ├── routes/v1/                  # API version 1 routes
│   │   ├── airplane-routes.js
│   │   ├── city-routes.js
│   │   ├── airport-routes.js
│   │   └── flight-routes.js
│   │
│   ├── middlewares/                # Request validation
│   │   ├── airplane-middlewares.js
│   │   ├── city-middlewares.js
│   │   ├── airport-middlewares.js
│   │   └── flight-middlewares.js
│   │
│   ├── controllers/                # HTTP request handlers
│   │   ├── airplane-controller.js
│   │   ├── city-controller.js
│   │   ├── airport-controller.js
│   │   └── flight-controller.js
│   │
│   ├── services/                   # Business logic
│   │   ├── airplane-service.js
│   │   ├── city-service.js
│   │   ├── airport-service.js
│   │   └── flight-service.js
│   │
│   ├── repositories/               # Database operations
│   │   ├── crud-repository.js     # Base CRUD class
│   │   ├── airplane-repository.js
│   │   ├── city-repository.js
│   │   ├── airport-repository.js
│   │   └── flight-repository.js
│   │
│   ├── models/                     # Sequelize models
│   │   ├── airplane.js
│   │   ├── city.js
│   │   ├── airport.js
│   │   └── flight.js
│   │
│   ├── migrations/                 # Database migrations
│   ├── seeders/                     # Database seeders
│   │
│   └── utils/                      # Utility classes & helpers
│       ├── common/
│       │   ├── success-response.js
│       │   └── error-response.js
│       ├── errors/
│       │   └── app-error.js
│       └── helpers/
│           ├── filters.js          # Flight filtering logic
│           └── dateTimeHelpers.js  # Date/time utilities
│
├── package.json
└── README.md
```

---

## 🔄 Request & Response Flow

### Example: Creating a Flight

**1. Client Request:**
```http
POST /api/v1/flights
Content-Type: application/json

{
  "flightNumber": "UK 808",
  "airplaneId": 7,
  "departureAirportId": "MUM",
  "arrivalAirportId": "LGB",
  "departureTime": "2026-01-20 06:15:00",
  "arrivalTime": "2026-01-20 07:30:00",
  "price": 7800,
  "totalSeats": 200
}
```

**2. Flow:**
```
Route → Middleware (validates) → Controller → Service (business logic) 
→ Repository → Model → Database
```

**3. Response:**
```json
{
  "success": true,
  "message": "Successfully completed the request",
  "data": {
    "id": 1,
    "flightNumber": "UK 808",
    ...
  },
  "error": {}
}
```

---

## ⚠️ Error Handling

### Error Flow:
```
Error Occurs → Service converts to AppError → Controller formats ErrorResponse → Client
```

### Error Types:
1. **SequelizeValidationError** - Model validation fails → 400 BAD_REQUEST
2. **AppError** - Custom application errors → Custom status code
3. **Database Errors** - Connection issues → 500 INTERNAL_SERVER_ERROR

### Example Error Response:
```json
{
  "success": false,
  "message": "Something went wrong",
  "data": {},
  "error": {
    "statusCode": 400,
    "explanation": ["Departure time cannot be greater than arrival time"]
  }
}
```

---

## 🏛️ Key Classes & Utilities

### 1. AppError Class
Custom error class with HTTP status codes.

```javascript
throw new AppError("Not found", StatusCodes.NOT_FOUND);
// Creates: { statusCode: 404, explanation: "Not found" }
```

### 2. CrudRepository Class
Base class providing common CRUD operations for all repositories.

```javascript
class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);  // Inherits create, get, getAll, update, destroy
  }
}
```

### 3. Response Templates
Standardized success and error responses.

```javascript
// Success
SuccessResponse.data = airplane;
return res.status(201).json(SuccessResponse);

// Error
ErrorResponse.error = error;
return res.status(error.statusCode).json(ErrorResponse);
```

### 4. Filter Helper (`utils/helpers/filters.js`)
Handles flight filtering and sorting logic.

**Filters:**
- `trips=MUM-LGB` - Filter by departure and arrival airports
- `price=5000-9000` - Filter by price range
- `tripDate=2026-01-20` - Filter by departure date
- `travellers=200` - Filter by available seats

**Sorting:**
- `sort=departureTime_ASC,price_DESC` - Sort by multiple fields

---

## 🌐 API Endpoints

### Airplanes
- `POST /api/v1/airplanes` - Create airplane
- `GET /api/v1/airplanes` - Get all airplanes
- `GET /api/v1/airplanes/:id` - Get airplane by ID
- `PATCH /api/v1/airplanes/:id` - Update airplane
- `DELETE /api/v1/airplanes/:id` - Delete airplane

### Cities
- `POST /api/v1/cities` - Create city
- `DELETE /api/v1/cities/:id` - Delete city
- `PATCH /api/v1/cities/:id` - Update city

### Airports
- `POST /api/v1/airports` - Create airport
- `GET /api/v1/airports` - Get all airports
- `GET /api/v1/airports/:id` - Get airport by ID
- `DELETE /api/v1/airports/:id` - Delete airport
- `PATCH /api/v1/airports/:id` - Update airport

### Flights
- `POST /api/v1/flights` - Create flight
- `GET /api/v1/flights` - Get all flights (with filters & sorting)
- `DELETE /api/v1/flights/:id` - Delete flight

**Flight Query Parameters:**
- `trips=MUM-LGB` - Filter by route
- `price=5000-9000` - Filter by price range
- `tripDate=2026-01-20` - Filter by departure date
- `travellers=200` - Filter by available seats
- `sort=departureTime_ASC,price_DESC` - Sort results

**Example:**
```http
GET /api/v1/flights?trips=MUM-LGB&price=5000-9000&tripDate=2026-01-20&sort=departureTime_ASC
```

### Swagger Documentation
- `GET /api-docs` - Interactive API documentation

---

## 🚀 Getting Started

### Prerequisites:
- Node.js installed
- MySQL database running
- Environment variables configured

### Installation:
```bash
npm install
```

### Database Setup:
```bash
# Run migrations
npx sequelize-cli db:migrate

# Run seeders (optional)
npx sequelize-cli db:seed:all
```

### Start Server:
```bash
npm run dev
```

### Access Swagger Docs:
```
http://localhost:3000/api-docs
```

---

## 📝 Key Concepts

### Why Layered Architecture?
- **Separation of Concerns**: Each layer has one responsibility
- **Testability**: Test each layer independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features

### Why HTTP-Agnostic Service/Repository?
Service and Repository layers don't know about HTTP, so they can be used in:
- REST APIs (current use case)
- CLI applications
- Background jobs
- GraphQL APIs
- WebSocket handlers

### Why Response Templates?
- **Consistency**: All endpoints return the same structure
- **Predictability**: Frontend knows what to expect
- **Error Handling**: Uniform error format

---

## 🤝 Contributing

When adding new features:
1. Follow the layered architecture
2. Use CrudRepository for new repositories
3. Use AppError for custom errors
4. Use SuccessResponse/ErrorResponse for responses
5. Add validation in models and middlewares
6. Update Swagger documentation

---

**Happy Coding! 🚀**
