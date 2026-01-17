const express = require('express');
const { FlightController } = require('../../controllers');
const { FlightMiddleware } = require('../../middlewares');
const router = express.Router();

/**
 * @swagger
 * /api/v1/flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - flightNumber
 *               - airplaneId
 *               - departureAirportId
 *               - arrivalAirportId
 *               - departureTime
 *               - arrivalTime
 *               - price
 *               - totalSeats
 *             properties:
 *               flightNumber:
 *                 type: string
 *                 description: Flight number
 *                 example: "UK 808"
 *               airplaneId:
 *                 type: integer
 *                 description: ID of the airplane
 *                 example: 7
 *               departureAirportId:
 *                 type: string
 *                 description: Code of the departure airport
 *                 example: "MUM"
 *               arrivalAirportId:
 *                 type: string
 *                 description: Code of the arrival airport
 *                 example: "LGB"
 *               departureTime:
 *                 type: string
 *                 format: date-time
 *                 description: Departure date and time
 *                 example: "2026-01-20 06:15:00"
 *               arrivalTime:
 *                 type: string
 *                 format: date-time
 *                 description: Arrival date and time
 *                 example: "2026-01-20 07:30:00"
 *               price:
 *                 type: integer
 *                 description: Price of the flight ticket
 *                 example: 7800
 *               boardingGate:
 *                 type: string
 *                 description: Boarding gate number (optional)
 *                 example: "A12"
 *               totalSeats:
 *                 type: integer
 *                 description: Total remaining seats available
 *                 example: 200
 *     responses:
 *       201:
 *         description: Flight created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully completed the request"
 *                 data:
 *                   $ref: '#/components/schemas/Flight'
 *                 error:
 *                   type: object
 *       400:
 *         description: Validation error or business logic error (e.g., departure time cannot be greater than arrival time)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", FlightMiddleware.validateCreateFlight, FlightController.createFlight);

/**
 * @swagger
 * /api/v1/flights:
 *   get:
 *     summary: Get all flights with optional filtering and sorting
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: trips
 *         schema:
 *           type: string
 *         description: 'Filter by route (format: DEPARTURE-ARRIVAL)'
 *         example: "MUM-LGB"
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         description: 'Filter by price range (format: MIN-MAX)'
 *         example: "5000-9000"
 *       - in: query
 *         name: tripDate
 *         schema:
 *           type: string
 *           format: date
 *         description: 'Filter by departure date (format: YYYY-MM-DD)'
 *         example: "2026-01-20"
 *       - in: query
 *         name: travellers
 *         schema:
 *           type: integer
 *         description: Filter by minimum available seats
 *         example: 200
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: 'Sort flights (format: FIELD_DIRECTION, multiple fields separated by comma)'
 *         example: "departureTime_ASC,price_DESC"
 *     responses:
 *       200:
 *         description: List of flights with nested details (airplane, airports, cities)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully completed the request"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FlightWithDetails'
 *                 error:
 *                   type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", FlightController.getAllFlights);

/**
 * @swagger
 * /api/v1/flights/{id}:
 *   delete:
 *     summary: Delete a flight by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Flight ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Flight deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Flight not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/:id", FlightController.deleteFlight);

module.exports = router;