import { Request, Response } from "express";
import { cinemasServices } from "../services/cinemas.services";

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
const getCinemas = async (req: Request, res: Response) => {
  try {
    const cinemas = await cinemasServices.getCinemas();
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  } finally {
    return;
  }
};

export const cinemasControllers = {
  getCinemas,
};
