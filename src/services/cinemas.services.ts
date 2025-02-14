import { Cinema } from "../models/cinemas.models";

type TCreateCinema = {
  name: string;
  seats: number;
};

const getCinemas = async () => {
  const cinemas = await Cinema.find();
  return cinemas;
};

const createCinema = async (data: TCreateCinema) => {
  const seats = Array.from({ length: data.seats }, (_, index) => ({
    seatNumber: index + 1,
    isAvailable: true,
  }));

  const cinema = new Cinema({
    name: data.name,
    seats: seats,
  });

  await cinema.save();

  return cinema;
};

export const cinemasServices = {
  getCinemas,
  createCinema,
};
