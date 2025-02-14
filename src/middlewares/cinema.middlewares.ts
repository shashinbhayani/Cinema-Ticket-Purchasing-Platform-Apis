import { NextFunction, Request, Response } from "express";
import * as Yup from "yup";

const createCinemaSchema = Yup.object().shape({
  name: Yup.string().required(),
  seats: Yup.number().positive().integer().required(),
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

export const cinemaMiddlewares = {
  createCinema,
};
