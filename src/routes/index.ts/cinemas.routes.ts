import { Router } from "express";
import { cinemasControllers } from "../../controllers/cinemas.controllers";
import { cinemaMiddlewares } from "../../middlewares/cinema.middlewares";

export const cinemaRouter = Router();

cinemaRouter.get("/", cinemasControllers.getCinemas);
cinemaRouter.post(
  "/",
  cinemaMiddlewares.createCinema,
  cinemasControllers.createCinema,
);
