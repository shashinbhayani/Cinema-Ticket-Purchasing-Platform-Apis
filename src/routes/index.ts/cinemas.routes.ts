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

cinemaRouter.post(
  "/:id/book/:seat",
  cinemaMiddlewares.bookSeat,
  cinemasControllers.bookSeat,
);

cinemaRouter.post(
  "/:id/seats/purchase-two-consecutive",
  cinemasControllers.bookTwoConsecutiveSeats,
);
