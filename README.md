# Flights API - Complete Project Documentation

## 📚 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Layers](#architecture--layers)
3. [Project Structure](#project-structure)
4. [Request & Response Flow](#request--response-flow)
5. [Dependencies & Coupling](#dependencies--coupling)
6. [Error Handling System](#error-handling-system)
7. [Response Templates](#response-templates)
8. [Classes & Their Purposes](#classes--their-purposes)
9. [Complete Flow Examples](#complete-flow-examples)
10. [Key Concepts Explained](#key-concepts-explained)

---

## 🎯 Project Overview

This is a **RESTful API** for managing airplanes built with **Node.js**, **Express**, and **Sequelize ORM**. The project follows a **layered architecture** pattern, ensuring clean separation of concerns and maintainable code.

### What This API Does:
- Create, Read, Update, and Delete (CRUD) operations for airplanes
- Validates airplane data (model number, capacity)
- Provides standardized error handling
- Returns consistent response formats

---

## 🏗️ Architecture & Layers

The project follows a **4-layer architecture**:

```
┌─────────────────────────────────────────┐
│         ROUTE LAYER                     │  ← Defines API endpoints
│  (airplane-routes.js)                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      MIDDLEWARE LAYER                   │  ← Validates requests
│  (airplane-middlewares.js)             │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      CONTROLLER LAYER                   │  ← Handles HTTP requests/responses
│  (airplane-controller.js)               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       SERVICE LAYER                    │  ← Business logic
│  (airplane-service.js)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      REPOSITORY LAYER                  │  ← Database operations
│  (airplane-repository.js)              │
│  (crud-repository.js)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         MODEL LAYER                    │  ← Database schema & validation
│  (airplane.js)                         │
└─────────────────────────────────────────┘
```

### Layer Responsibilities:

| Layer | Responsibility | HTTP-Aware? | Example |
|-------|---------------|------------|---------|
| **Route** | Defines URL endpoints | ✅ Yes | `POST /api/v1/airplanes` |
| **Middleware** | Validates incoming requests | ✅ Yes | Checks if `modelNumber` exists |
| **Controller** | Handles HTTP requests/responses | ✅ Yes | Converts data to JSON response |
| **Service** | Business logic | ❌ No | Validates business rules |
| **Repository** | Database operations | ❌ No | Executes SQL queries |
| **Model** | Database schema & validation | ❌ No | Defines table structure |

---

## 📁 Project Structure

```
flights/
├── src/
│   ├── index.js                    # Entry point, Express app setup
│   ├── config/                     # Configuration files
│   │   ├── config.json            # Database config
│   │   ├── server-config.js       # Server settings
│   │   └── logger-config.js       # Logging setup
│   │
│   ├── routes/                     # Route definitions
│   │   ├── index.js               # Main router
│   │   └── v1/                    # API version 1
│   │       ├── index.js           # V1 router
│   │       └── airplane-routes.js # Airplane endpoints
│   │
│   ├── middlewares/                # Request validation
│   │   └── airplane-middlewares.js
│   │
│   ├── controllers/                # HTTP request handlers
│   │   └── airplane-controller.js
│   │
│   ├── services/                   # Business logic
│   │   └── airplane-service.js
│   │
│   ├── repositories/               # Database operations
│   │   ├── crud-repository.js     # Base CRUD class
│   │   └── airplane-repository.js # Airplane-specific repo
│   │
│   ├── models/                     # Sequelize models
│   │   └── airplane.js            # Airplane model
│   │
│   ├── migrations/                 # Database migrations
│   │   └── 20260113121154-create-airplane.js
│   │
│   ├── seeders/                    # Database seeders
│   │   └── 20260113182344-add-airplanes.js
│   │
│   └── utils/                      # Utility classes
│       ├── common/
│       │   ├── success-response.js # Success template
│       │   └── error-response.js   # Error template
│       └── errors/
│           └── app-error.js        # Custom error class
│
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🔄 Request & Response Flow

### Complete Flow Diagram:

```
1. Client Request
   ↓
2. Express App (index.js)
   ↓
3. Route Handler (airplane-routes.js)
   ↓
4. Middleware (airplane-middlewares.js) ← Validates request
   ↓
5. Controller (airplane-controller.js) ← Extracts data from request
   ↓
6. Service (airplane-service.js) ← Business logic
   ↓
7. Repository (airplane-repository.js) ← Database operations
   ↓
8. Model (airplane.js) ← Sequelize ORM
   ↓
9. Database (MySQL)
   ↓
10. Response flows back up (Database → Model → Repository → Service → Controller)
   ↓
11. Controller formats response using SuccessResponse/ErrorResponse
   ↓
12. Client receives JSON response
```

### Step-by-Step Example: Creating an Airplane

#### **Step 1: Client Sends Request**
```http
POST /api/v1/airplanes
Content-Type: application/json

{
  "modelNumber": "Boeing 737",
  "capacity": 189
}
```

#### **Step 2: Express App Receives Request** (`src/index.js`)
```javascript
app.use('/api', apiRoutes);  // Routes to /api/v1/airplanes
```

#### **Step 3: Route Handler** (`src/routes/v1/airplane-routes.js`)
```javascript
router.post('/', 
  AirplaneMiddlewares.validateCreateRequest,  // First: Validate
  AirplaneController.createAirplane            // Then: Handle
);
```

#### **Step 4: Middleware Validation** (`src/middlewares/airplane-middlewares.js`)
```javascript
function validateCreateRequest(req, res, next) {
  if(!req.body.modelNumber) {
    // ❌ Validation fails → Return error immediately
    ErrorResponse.error = {explanation: "Model number is required"};
    return res.status(400).json(ErrorResponse);
  }
  next();  // ✅ Validation passes → Continue to controller
}
```

#### **Step 5: Controller** (`src/controllers/airplane-controller.js`)
```javascript
async function createAirplane(req, res) {
  try {
    // Extract data from request
    const data = {
      modelNumber: req.body.modelNumber,  // "Boeing 737"
      capacity: req.body.capacity         // 189
    };
    
    // Call service
    const airplane = await AirplaneService.createAirplane(data);
    
    // Format success response
    SuccessResponse.data = airplane;
    return res.status(201).json(SuccessResponse);
  } catch(error) {
    // Format error response
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
```

#### **Step 6: Service** (`src/services/airplane-service.js`)
```javascript
async function createAirplane(data) {
  try {
    // Call repository
    const airplane = await airplaneRepository.create(data);
    return airplane;  // Return to controller
  } catch(error) {
    // Handle validation errors
    if(error.name == "SequelizeValidationError") {
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError("Cannot create airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
```

#### **Step 7: Repository** (`src/repositories/airplane-repository.js`)
```javascript
// AirplaneRepository extends CrudRepository
// So it inherits the create() method
```

#### **Step 8: CRUD Repository** (`src/repositories/crud-repository.js`)
```javascript
async create(data) {
  const response = await this.model.create(data);
  return response;  // Returns the created airplane object
}
```

#### **Step 9: Model** (`src/models/airplane.js`)
```javascript
// Sequelize validates the data based on model definition
Airplane.init({
  modelNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isAlphanumeric: true }
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 50, max: 1000 }
  }
});
```

#### **Step 10: Database**
```sql
INSERT INTO Airplanes (modelNumber, capacity, createdAt, updatedAt) 
VALUES ('Boeing 737', 189, NOW(), NOW());
```

#### **Step 11: Response Flows Back**
```
Database → Model → Repository → Service → Controller
```

#### **Step 12: Client Receives Response**
```json
{
  "success": true,
  "message": "Successfully completed the request",
  "data": {
    "id": 1,
    "modelNumber": "Boeing 737",
    "capacity": 189,
    "createdAt": "2024-01-13T...",
    "updatedAt": "2024-01-13T..."
  },
  "error": {}
}
```

---

## 🔗 Dependencies & Coupling

### Dependency Flow (Who Depends on Whom):

```
Route → Controller → Service → Repository → Model
  ↓         ↓
Middleware  ErrorResponse/SuccessResponse
```

### Detailed Dependencies:

#### **1. Route Layer** (`airplane-routes.js`)
**Depends on:**
- `Controller` - To handle the request
- `Middleware` - To validate before controller

**Example:**
```javascript
const { AirplaneController } = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');

router.post('/', 
  AirplaneMiddlewares.validateCreateRequest,  // Uses middleware
  AirplaneController.createAirplane            // Uses controller
);
```

#### **2. Middleware Layer** (`airplane-middlewares.js`)
**Depends on:**
- `ErrorResponse` - To send error responses
- `AppError` - To create structured errors
- `StatusCodes` - For HTTP status codes

**Example:**
```javascript
const {ErrorResponse} = require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if(!req.body.modelNumber) {
    ErrorResponse.error = {explanation: "Model number is required"};
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
```

#### **3. Controller Layer** (`airplane-controller.js`)
**Depends on:**
- `Service` - To get business logic
- `SuccessResponse` - To format success responses
- `ErrorResponse` - To format error responses
- `StatusCodes` - For HTTP status codes

**Example:**
```javascript
const {AirplaneService} = require('../services')
const {SuccessResponse, ErrorResponse} = require('../utils/common')

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane(data);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch(error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
```

#### **4. Service Layer** (`airplane-service.js`)
**Depends on:**
- `Repository` - To access database
- `AppError` - To create custom errors
- `StatusCodes` - For error status codes

**Example:**
```javascript
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch(error) {
    throw new AppError("Cannot create airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
```

#### **5. Repository Layer** (`airplane-repository.js` & `crud-repository.js`)
**Depends on:**
- `Model` - To interact with database
- `AppError` - To throw not found errors
- `StatusCodes` - For error status codes

**Example:**
```javascript
// AirplaneRepository extends CrudRepository
class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);  // Passes Airplane model to CrudRepository
  }
}

// CrudRepository uses the model
class CrudRepository {
  constructor(model) {
    this.model = model;  // Stores Airplane model
  }
  
  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
    }
    return response;
  }
}
```

#### **6. Model Layer** (`airplane.js`)
**Depends on:**
- `Sequelize` - ORM framework
- No other project files (only external dependencies)

**Example:**
```javascript
const { Model } = require('sequelize');

class Airplane extends Model {
  // Model definition
}
```

### Key Coupling Principles:

1. **One-Way Dependencies**: Each layer only depends on layers below it
   - Route → Controller → Service → Repository → Model
   - Never the reverse!

2. **HTTP-Aware Layers**: Only Route, Middleware, and Controller know about HTTP
   - Service and Repository are HTTP-agnostic (can be used in CLI, background jobs, etc.)

3. **Shared Utilities**: `SuccessResponse`, `ErrorResponse`, and `AppError` are used across layers
   - But only HTTP-aware layers use response templates

---

## ⚠️ Error Handling System

### Error Types in the Project:

1. **SequelizeValidationError** - Model validation fails
2. **AppError** - Custom application errors
3. **Database Errors** - Connection issues, SQL errors
4. **TypeError/ReferenceError** - Code bugs

### Error Flow:

```
Error Occurs → Repository/Service → AppError → Controller → ErrorResponse → Client
```

### Error Handling at Each Layer:

#### **1. Model Layer** (`airplane.js`)
**Validates data structure:**
```javascript
Airplane.init({
  modelNumber: {
    validate: { isAlphanumeric: true }  // Throws SequelizeValidationError if fails
  },
  capacity: {
    validate: { min: 50, max: 1000 }   // Throws SequelizeValidationError if fails
  }
});
```

**Example Error:**
```javascript
// If capacity = 1200 (exceeds max: 1000)
// Sequelize throws: SequelizeValidationError
// With message: "Validation max on capacity failed"
```

#### **2. Repository Layer** (`crud-repository.js`)
**Handles "Not Found" errors:**
```javascript
async get(data) {
  const response = await this.model.findByPk(data);
  if (!response) {
    throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
  }
  return response;
}
```

**Example Error:**
```javascript
// If airplane with id=999 doesn't exist
// Throws: AppError { statusCode: 404, explanation: "Not able to find the resource" }
```

#### **3. Service Layer** (`airplane-service.js`)
**Converts errors to AppError:**
```javascript
async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch(error) {
    // Handle SequelizeValidationError
    if(error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    // Handle other errors
    throw new AppError("Cannot create airplane", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
```

**Example Error Flow:**
```
1. Repository throws SequelizeValidationError
2. Service catches it
3. Service extracts error messages
4. Service throws AppError with statusCode: 400
```

#### **4. Controller Layer** (`airplane-controller.js`)
**Formats errors for HTTP response:**
```javascript
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane(data);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch(error) {
    ErrorResponse.error = error;  // AppError object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
```

**Example Error Response:**
```json
{
  "success": false,
  "message": "Something went wrong",
  "data": {},
  "error": {
    "statusCode": 400,
    "explanation": [
      "Validation isAlphanumeric on modelNumber failed",
      "Validation max on capacity failed"
    ]
  }
}
```

#### **5. Middleware Layer** (`airplane-middlewares.js`)
**Stops bad requests early:**
```javascript
function validateCreateRequest(req, res, next) {
  if(!req.body.modelNumber) {
    ErrorResponse.error = {explanation: "Model number is required"};
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    // ⚠️ Request stops here - never reaches controller
  }
  next();  // Only called if validation passes
}
```

### Error Handling Best Practices:

1. **Early Validation**: Middleware catches bad requests before they reach business logic
2. **Consistent Errors**: All errors are converted to `AppError` in service layer
3. **Proper Status Codes**: 
   - `400 BAD_REQUEST` - Validation errors
   - `404 NOT_FOUND` - Resource not found
   - `500 INTERNAL_SERVER_ERROR` - Server errors
4. **Error Messages**: Always provide clear, helpful error messages

---

## 📋 Response Templates

### Why Response Templates?

**Problem Without Templates:**
```javascript
// Controller 1
return res.json({ airplane: data });

// Controller 2
return res.json({ result: data, status: "ok" });

// Controller 3
return res.json(data);
```
❌ Inconsistent response structure
❌ Frontend doesn't know what to expect
❌ Hard to handle errors uniformly

**Solution With Templates:**
```javascript
// All controllers return the same structure
{
  "success": true/false,
  "message": "...",
  "data": {...},
  "error": {...}
}
```
✅ Consistent across all endpoints
✅ Frontend always knows the structure
✅ Easy error handling

### SuccessResponse Template

**Location:** `src/utils/common/success-response.js`

**Structure:**
```javascript
const success = {
  success: true,
  message: "Successfully completed the request",
  data: {},
  error: {}
}

module.exports = success;
```

**Usage in Controller:**
```javascript
const {SuccessResponse} = require('../utils/common')

async function createAirplane(req, res) {
  const airplane = await AirplaneService.createAirplane(data);
  
  SuccessResponse.data = airplane;  // Set the data
  // SuccessResponse now looks like:
  // {
  //   success: true,
  //   message: "Successfully completed the request",
  //   data: { id: 1, modelNumber: "Boeing 737", ... },
  //   error: {}
  // }
  
  return res.status(StatusCodes.CREATED).json(SuccessResponse);
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Successfully completed the request",
  "data": {
    "id": 1,
    "modelNumber": "Boeing 737",
    "capacity": 189,
    "createdAt": "2024-01-13T10:00:00.000Z",
    "updatedAt": "2024-01-13T10:00:00.000Z"
  },
  "error": {}
}
```

### ErrorResponse Template

**Location:** `src/utils/common/error-response.js`

**Structure:**
```javascript
const error = {
  success: false,
  message: "Something went wrong",
  data: {},
  error: {}
}

module.exports = error;
```

**Usage in Controller:**
```javascript
const {ErrorResponse} = require('../utils/common')

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane(data);
    // ...
  } catch(error) {
    ErrorResponse.error = error;  // Set the error
    // ErrorResponse.error will contain the AppError object
    return res.status(error.statusCode).json(ErrorResponse);
  }
}
```

**Example Response:**
```json
{
  "success": false,
  "message": "Something went wrong",
  "data": {},
  "error": {
    "statusCode": 400,
    "explanation": [
      "Validation isAlphanumeric on modelNumber failed",
      "Validation max on capacity failed"
    ]
  }
}
```

**Usage in Middleware:**
```javascript
function validateCreateRequest(req, res, next) {
  if(!req.body.modelNumber) {
    ErrorResponse.message = "Something went wrong while creating an airplane";
    ErrorResponse.error = {explanation: "Model number is required"};
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
```

### Key Points About Response Templates:

1. **Shared Object Reference**: `SuccessResponse` and `ErrorResponse` are objects, not classes
   - When you modify them, you modify the shared object
   - This is simple but works for this use case

2. **Only HTTP-Aware Layers Use Them**: 
   - ✅ Controller uses them
   - ✅ Middleware uses them
   - ❌ Service doesn't use them (HTTP-agnostic)
   - ❌ Repository doesn't use them (HTTP-agnostic)

3. **Consistent Structure**: All API responses follow the same format
   - Frontend developers know exactly what to expect
   - Easy to handle in frontend code

---

## 🏛️ Classes & Their Purposes

### 1. AppError Class

**Location:** `src/utils/errors/app-error.js`

**Purpose:** Custom error class that extends JavaScript's built-in `Error` class to include HTTP status codes.

**Code:**
```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);              // Calls Error constructor
    this.statusCode = statusCode; // Adds statusCode property
    this.explanation = message;   // Stores explanation
  }
}

module.exports = AppError;
```

**Why It Exists:**
- JavaScript's `Error` class doesn't have `statusCode`
- We need status codes for HTTP responses
- Provides consistent error structure across the application

**Usage:**
```javascript
// In Service Layer
throw new AppError("Cannot find airplane", StatusCodes.NOT_FOUND);
// Creates: AppError { statusCode: 404, explanation: "Cannot find airplane" }

// In Controller
catch(error) {
  res.status(error.statusCode);  // Uses the statusCode property
}
```

**Key Properties:**
- `message` - Error message (from Error class)
- `statusCode` - HTTP status code (custom property)
- `explanation` - Same as message (for consistency)

### 2. CrudRepository Class

**Location:** `src/repositories/crud-repository.js`

**Purpose:** Base class that provides common CRUD operations for all repositories.

**Code:**
```javascript
class CrudRepository {
  constructor(model) {
    this.model = model;  // Stores the Sequelize model
  }

  async create(data) { /* ... */ }
  async get(data) { /* ... */ }
  async getAll() { /* ... */ }
  async update(data, id) { /* ... */ }
  async destroy(data) { /* ... */ }
}
```

**Why It Exists:**
- **DRY Principle**: Don't Repeat Yourself
- All repositories need the same CRUD operations
- Instead of writing the same code in every repository, write it once and inherit it

**Usage:**
```javascript
// AirplaneRepository extends CrudRepository
class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);  // Passes Airplane model to CrudRepository
  }
}

// Now AirplaneRepository has all CRUD methods:
const repo = new AirplaneRepository();
await repo.create(data);   // Inherited from CrudRepository
await repo.get(id);        // Inherited from CrudRepository
await repo.update(data, id); // Inherited from CrudRepository
```

**Benefits:**
1. **Code Reusability**: Write CRUD once, use everywhere
2. **Consistency**: All repositories work the same way
3. **Maintainability**: Fix bugs in one place, all repositories benefit
4. **Scalability**: Easy to add new repositories (just extend CrudRepository)

**Example:**
```javascript
// Without CrudRepository (Bad):
class AirplaneRepository {
  async create(data) { /* 10 lines of code */ }
  async get(id) { /* 10 lines of code */ }
  // ... repeat for every repository
}

class FlightRepository {
  async create(data) { /* Same 10 lines of code */ }
  async get(id) { /* Same 10 lines of code */ }
  // ... duplicate code everywhere
}

// With CrudRepository (Good):
class CrudRepository {
  async create(data) { /* 10 lines of code - written once */ }
  async get(id) { /* 10 lines of code - written once */ }
}

class AirplaneRepository extends CrudRepository {
  constructor() { super(Airplane); }
}

class FlightRepository extends CrudRepository {
  constructor() { super(Flight); }
}
// Both get all CRUD methods automatically!
```

### 3. AirplaneRepository Class

**Location:** `src/repositories/airplane-repository.js`

**Purpose:** Airplane-specific repository that extends CrudRepository.

**Code:**
```javascript
class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);  // Passes Airplane model to parent class
  }
}

module.exports = AirplaneRepository;
```

**Why It Exists:**
- Provides airplane-specific database operations
- Inherits all CRUD operations from CrudRepository
- Can add airplane-specific methods if needed in the future

**Usage:**
```javascript
const airplaneRepository = new AirplaneRepository();

// All these methods are inherited from CrudRepository:
await airplaneRepository.create({modelNumber: "Boeing 737", capacity: 189});
await airplaneRepository.get(1);
await airplaneRepository.getAll();
await airplaneRepository.update({capacity: 200}, 1);
await airplaneRepository.destroy(1);
```

**Future Extensibility:**
```javascript
class AirplaneRepository extends CrudRepository {
  constructor() {
    super(Airplane);
  }
  
  // Can add airplane-specific methods:
  async getByModelNumber(modelNumber) {
    return await this.model.findOne({ where: { modelNumber } });
  }
}
```

### 4. Airplane Model Class

**Location:** `src/models/airplane.js`

**Purpose:** Sequelize model that represents the Airplanes table in the database.

**Code:**
```javascript
class Airplane extends Model {
  static associate(models) {
    // Define relationships with other models
  }
}

Airplane.init({
  modelNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isAlphanumeric: true }
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 50, max: 1000 }
  }
}, {
  sequelize,
  modelName: 'Airplane',
});
```

**Why It Exists:**
- Maps JavaScript objects to database tables
- Provides validation rules
- Enables Sequelize ORM operations

**Usage:**
```javascript
// Create
const airplane = await Airplane.create({
  modelNumber: "Boeing 737",
  capacity: 189
});

// Find
const airplane = await Airplane.findByPk(1);

// Update
await Airplane.update({capacity: 200}, {where: {id: 1}});
```

**Validation:**
```javascript
// If you try to create with invalid data:
await Airplane.create({
  modelNumber: "Boeing 737 $",  // ❌ Contains special character
  capacity: 1200                 // ❌ Exceeds max: 1000
});
// Sequelize throws: SequelizeValidationError
```

---

## 🔍 Complete Flow Examples

### Example 1: Successful Airplane Creation

**Request:**
```http
POST /api/v1/airplanes
Content-Type: application/json

{
  "modelNumber": "Boeing 737",
  "capacity": 189
}
```

**Flow:**
1. ✅ **Route**: `POST /` → Calls `createAirplane` controller
2. ✅ **Middleware**: Validates `modelNumber` and `capacity` exist → Passes
3. ✅ **Controller**: Extracts data → Calls service
4. ✅ **Service**: Calls repository
5. ✅ **Repository**: Calls Sequelize model
6. ✅ **Model**: Validates data → Passes
7. ✅ **Database**: Inserts record → Returns new airplane
8. ✅ **Response**: SuccessResponse with airplane data

**Response:**
```json
{
  "success": true,
  "message": "Successfully completed the request",
  "data": {
    "id": 1,
    "modelNumber": "Boeing 737",
    "capacity": 189,
    "createdAt": "2024-01-13T10:00:00.000Z",
    "updatedAt": "2024-01-13T10:00:00.000Z"
  },
  "error": {}
}
```

### Example 2: Validation Error (Capacity Too High)

**Request:**
```http
POST /api/v1/airplanes
Content-Type: application/json

{
  "modelNumber": "Boeing 737",
  "capacity": 1200
}
```

**Flow:**
1. ✅ **Route**: `POST /` → Calls `createAirplane` controller
2. ✅ **Middleware**: Validates `modelNumber` and `capacity` exist → Passes
3. ✅ **Controller**: Extracts data → Calls service
4. ✅ **Service**: Calls repository
5. ✅ **Repository**: Calls Sequelize model
6. ❌ **Model**: Validates `capacity: 1200` → **FAILS** (max: 1000)
7. ❌ **Sequelize**: Throws `SequelizeValidationError`
8. ❌ **Repository**: Error bubbles up
9. ❌ **Service**: Catches error → Converts to `AppError` with statusCode: 400
10. ❌ **Controller**: Catches `AppError` → Formats ErrorResponse
11. ❌ **Response**: ErrorResponse with validation errors

**Response:**
```json
{
  "success": false,
  "message": "Something went wrong",
  "data": {},
  "error": {
    "statusCode": 400,
    "explanation": [
      "Validation max on capacity failed"
    ]
  }
}
```

### Example 3: Missing Required Field (Middleware Catches It)

**Request:**
```http
POST /api/v1/airplanes
Content-Type: application/json

{
  "capacity": 189
}
```

**Flow:**
1. ✅ **Route**: `POST /` → Calls middleware first
2. ❌ **Middleware**: Checks `req.body.modelNumber` → **NOT FOUND**
3. ❌ **Middleware**: Returns ErrorResponse immediately
4. ❌ **Response**: Request never reaches controller

**Response:**
```json
{
  "success": false,
  "message": "Something went wrong while creating an airplane",
  "data": {},
  "error": {
    "explanation": "Model number is required"
  }
}
```

### Example 4: Get Airplane That Doesn't Exist

**Request:**
```http
GET /api/v1/airplanes/999
```

**Flow:**
1. ✅ **Route**: `GET /:id` → Calls `getAirplane` controller
2. ✅ **Controller**: Extracts `id: 999` → Calls service
3. ✅ **Service**: Calls repository
4. ✅ **Repository**: Calls `findByPk(999)`
5. ❌ **Database**: No record found → Returns `null`
6. ❌ **Repository**: Checks `if (!response)` → **TRUE**
7. ❌ **Repository**: Throws `AppError` with statusCode: 404
8. ❌ **Service**: Error bubbles up
9. ❌ **Controller**: Catches `AppError` → Formats ErrorResponse
10. ❌ **Response**: ErrorResponse with 404 status

**Response:**
```json
{
  "success": false,
  "message": "Something went wrong",
  "data": {},
  "error": {
    "statusCode": 404,
    "explanation": "The airplane you requested is not present"
  }
}
```

---

## 💡 Key Concepts Explained

### 1. Why Layered Architecture?

**Benefits:**
- **Separation of Concerns**: Each layer has one responsibility
- **Testability**: Can test each layer independently
- **Maintainability**: Changes in one layer don't affect others
- **Scalability**: Easy to add new features

**Example:**
```
If you need to change how data is stored:
- Only modify Repository layer
- Service, Controller, Route remain unchanged

If you need to change API response format:
- Only modify Controller layer
- Service and Repository remain unchanged
```

### 2. Why HTTP-Agnostic Service/Repository?

**Service and Repository don't know about HTTP:**
- Can be used in CLI applications
- Can be used in background jobs
- Can be used in GraphQL APIs
- Can be used in WebSocket handlers

**Example:**
```javascript
// Same service can be used in:
// 1. REST API (Express)
const airplane = await AirplaneService.createAirplane(data);
res.json(airplane);

// 2. CLI Script
const airplane = await AirplaneService.createAirplane(data);
console.log(airplane);

// 3. Background Job
const airplane = await AirplaneService.createAirplane(data);
await sendEmail(airplane);
```

### 3. Why Inheritance (CrudRepository)?

**Benefits:**
- **Code Reusability**: Write once, use everywhere
- **Consistency**: All repositories work the same way
- **Maintainability**: Fix bugs in one place

**Example:**
```javascript
// Without inheritance (Bad):
class AirplaneRepository {
  async create(data) { /* 10 lines */ }
  async get(id) { /* 10 lines */ }
}

class FlightRepository {
  async create(data) { /* Same 10 lines - duplicated! */ }
  async get(id) { /* Same 10 lines - duplicated! */ }
}

// With inheritance (Good):
class CrudRepository {
  async create(data) { /* 10 lines - written once */ }
  async get(id) { /* 10 lines - written once */ }
}

class AirplaneRepository extends CrudRepository {}
class FlightRepository extends CrudRepository {}
// Both automatically get create() and get() methods!
```

### 4. Why Response Templates?

**Benefits:**
- **Consistency**: All endpoints return same structure
- **Predictability**: Frontend knows what to expect
- **Error Handling**: Uniform error format

**Example:**
```javascript
// Without templates (Bad):
// Endpoint 1 returns: { airplane: {...} }
// Endpoint 2 returns: { result: {...}, status: "ok" }
// Endpoint 3 returns: {...}

// Frontend has to handle each differently:
if (response.airplane) { /* ... */ }
else if (response.result) { /* ... */ }
else { /* ... */ }

// With templates (Good):
// All endpoints return: { success: true, data: {...}, error: {} }

// Frontend handles all the same way:
if (response.success) {
  // Use response.data
} else {
  // Handle response.error
}
```

### 5. Why AppError Class?

**Benefits:**
- **Consistent Errors**: All errors have statusCode
- **Type Safety**: Can check `error instanceof AppError`
- **HTTP Integration**: Easy to convert to HTTP responses

**Example:**
```javascript
// Without AppError (Bad):
throw new Error("Not found");
// How do you know it's a 404 error?

// With AppError (Good):
throw new AppError("Not found", StatusCodes.NOT_FOUND);
// Controller can use: error.statusCode (404)
```

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

### API Endpoints:
- `POST /api/v1/airplanes` - Create airplane
- `GET /api/v1/airplanes` - Get all airplanes
- `GET /api/v1/airplanes/:id` - Get airplane by ID
- `PATCH /api/v1/airplanes/:id` - Update airplane
- `DELETE /api/v1/airplanes/:id` - Delete airplane

---

## 📝 Summary

This project demonstrates:
- ✅ **Layered Architecture** - Clean separation of concerns
- ✅ **Error Handling** - Consistent error management
- ✅ **Response Templates** - Standardized API responses
- ✅ **Code Reusability** - Inheritance and shared utilities
- ✅ **Validation** - Model-level and middleware-level validation
- ✅ **Best Practices** - HTTP-agnostic business logic

The architecture makes the codebase:
- **Maintainable** - Easy to modify and extend
- **Testable** - Each layer can be tested independently
- **Scalable** - Easy to add new features
- **Consistent** - Uniform patterns throughout

---

## 🤝 Contributing

When adding new features:
1. Follow the layered architecture
2. Use CrudRepository for new repositories
3. Use AppError for custom errors
4. Use SuccessResponse/ErrorResponse for responses
5. Add validation in models and middlewares

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

**Happy Coding! 🚀**
