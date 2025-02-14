import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";
import { Cinema } from "../models/cinemas.models";

const createCinemaSchema = Yup.object().shape({
  name: Yup.string().required(),
  seats: Yup.number().positive().integer().required(),
});

const bookSeatSchema = Yup.object().shape({
  id: Yup.string().required(),
  seat: Yup.number().positive().integer().required(),
});

const createCinema = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await createCinemaSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const bookSeat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await bookSeatSchema.validate(req.params, { abortEarly: false });

    const { id, seat } = req.params;

    const cinema = await Cinema.findOne({ _id: id });

    let error;

    if (!cinema) {
      error = "Cinema not found";
    } else if (parseInt(seat) > cinema?.seats.length!) {
      error = "Invalid seat number";
    } else {
      const seatDetail = cinema.seats.find(
        (s) => s.seatNumber === parseInt(seat),
      );
      if (!seatDetail) {
        error = "Seat is not available";
      } else if (!seatDetail.isAvailable) {
        error = "Seat already purchased";
      }
    }

    if (error) {
      res.status(400).json({ error: error });
      return;
    }

    next();
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const cinemaMiddlewares = {
  createCinema,
  bookSeat,
};
