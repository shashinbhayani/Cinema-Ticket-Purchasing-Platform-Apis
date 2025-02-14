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

/**
 * @swagger
 * /cinemas:
 *   post:
 *     summary: Create a new cinema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               seats:
 *                 type: number
 *             required:
 *               - name
 *               - seats
 *     responses:
 *       200:
 *         description: Cinema created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cinema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const createCinema = async (req: Request, res: Response) => {
  try {
    const cinema = await cinemasServices.createCinema(req.body);
    res.json(cinema);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    return;
  }
};

/**
 * @swagger
 * /cinemas/{id}/book/{seat}:
 *   post:
 *     summary: Book a seat in a cinema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cinema ID
 *       - in: path
 *         name: seat
 *         required: true
 *         schema:
 *           type: integer
 *         description: The seat number to book
 *     responses:
 *       200:
 *         description: Seat booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const bookSeat = async (req: Request, res: Response) => {
  const { id, seat } = req.params;

  try {
    const cinema = await cinemasServices.bookSeat(id, parseInt(seat));
    res.json(cinema);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    return;
  }
};

export const cinemasControllers = {
  getCinemas,
  createCinema,
  bookSeat,
};
