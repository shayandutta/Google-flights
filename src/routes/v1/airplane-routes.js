const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");
const router = express.Router();

/**
 * @swagger
 * /api/v1/airplanes:
 *   post:
 *     summary: Create a new airplane
 *     tags: [Airplanes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - modelNumber
 *               - capacity
 *             properties:
 *               modelNumber:
 *                 type: string
 *                 description: "Model number of the airplane (alphanumeric only)"
 *                 example: "Boeing 737"
 *               capacity:
 *                 type: integer
 *                 description: "Passenger capacity - min 50, max 1000"
 *                 minimum: 50
 *                 maximum: 1000
 *                 example: 189
 *     responses:
 *       201:
 *         description: Airplane created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Validation error
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
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

/**
 * @swagger
 * /api/v1/airplanes:
 *   get:
 *     summary: Get all airplanes
 *     tags: [Airplanes]
 *     responses:
 *       200:
 *         description: List of all airplanes
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
 *                     $ref: '#/components/schemas/Airplane'
 *                 error:
 *                   type: object
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", AirplaneController.getAirplanes);

/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *   get:
 *     summary: Get an airplane by ID
 *     tags: [Airplanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Airplane ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Airplane details
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
 *                   $ref: '#/components/schemas/Airplane'
 *                 error:
 *                   type: object
 *       404:
 *         description: Airplane not found
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
router.get("/:id", AirplaneController.getAirplane);

/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *   delete:
 *     summary: Delete an airplane by ID
 *     tags: [Airplanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Airplane ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Airplane deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Airplane not found
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
router.delete("/:id", AirplaneController.deleteAirplane);

/**
 * @swagger
 * /api/v1/airplanes/{id}:
 *   patch:
 *     summary: Update an airplane by ID
 *     tags: [Airplanes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Airplane ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               modelNumber:
 *                 type: string
 *                 description: "Model number of the airplane (alphanumeric only)"
 *                 example: "Airbus A320"
 *               capacity:
 *                 type: integer
 *                 description: "Passenger capacity - min 50, max 1000"
 *                 minimum: 50
 *                 maximum: 1000
 *                 example: 180
 *     responses:
 *       200:
 *         description: Airplane updated successfully
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
 *                   $ref: '#/components/schemas/Airplane'
 *                 error:
 *                   type: object
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Airplane not found
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
router.patch("/:id", AirplaneController.updateAirplane);

module.exports = router;
