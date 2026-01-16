const express = require("express");
const router = express.Router();
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");

/**
 * @swagger
 * /api/v1/airports:
 *   post:
 *     summary: Create a new airport
 *     tags: [Airports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - cityId
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the airport
 *                 example: "Kempegowda International Airport"
 *               code:
 *                 type: string
 *                 description: Airport code (IATA code) - must be unique
 *                 example: "BLR"
 *               address:
 *                 type: string
 *                 description: Address of the airport
 *                 example: "Bangalore, India"
 *               cityId:
 *                 type: integer
 *                 description: ID of the city where the airport is located
 *                 example: 2
 *     responses:
 *       201:
 *         description: Airport created successfully
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
 *                   $ref: '#/components/schemas/Airport'
 *                 error:
 *                   type: object
 *       400:
 *         description: Validation error or duplicate airport name/code
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
router.post('/', AirportMiddleware.validateCreateAirport, AirportController.createAirport);

/**
 * @swagger
 * /api/v1/airports:
 *   get:
 *     summary: Get all airports
 *     tags: [Airports]
 *     responses:
 *       200:
 *         description: List of all airports
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
 *                     $ref: '#/components/schemas/Airport'
 *                 error:
 *                   type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', AirportController.getAirports);

/**
 * @swagger
 * /api/v1/airports/{id}:
 *   get:
 *     summary: Get an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Airport ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Airport details
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
 *                   $ref: '#/components/schemas/Airport'
 *                 error:
 *                   type: object
 *       404:
 *         description: Airport not found
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
router.get('/:id', AirportController.getAirport);

/**
 * @swagger
 * /api/v1/airports/{id}:
 *   delete:
 *     summary: Delete an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Airport ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Airport deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Airport not found
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
router.delete('/:id', AirportController.deletedAirport);

/**
 * @swagger
 * /api/v1/airports/{id}:
 *   patch:
 *     summary: Update an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Airport ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the airport
 *                 example: "Kempegowda International Airport"
 *               code:
 *                 type: string
 *                 description: Airport code (IATA code) - must be unique
 *                 example: "BLR"
 *               address:
 *                 type: string
 *                 description: Address of the airport
 *                 example: "Bangalore, Karnataka, India"
 *               cityId:
 *                 type: integer
 *                 description: ID of the city where the airport is located
 *                 example: 2
 *     responses:
 *       200:
 *         description: Airport updated successfully
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
 *                   $ref: '#/components/schemas/Airport'
 *                 error:
 *                   type: object
 *       400:
 *         description: Validation error, duplicate airport name/code, or empty request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Airport not found
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
router.patch('/:id',  AirportMiddleware.validateUpdateAirport, AirportController.updateAirport);

module.exports = router;