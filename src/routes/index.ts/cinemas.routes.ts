import { Router } from "express";
import { cinemasControllers } from "../../controllers/cinemas.controllers";

export const cinemaRouter = Router();

/**
 * @swagger
 * /cinemas:
 *   get:
 *     summary: Retrieve a list of cinemas
 *     responses:
 *       200:
 *         description: A list of cinemas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cinema'
 */
cinemaRouter.get("/", cinemasControllers.getCinemas);
