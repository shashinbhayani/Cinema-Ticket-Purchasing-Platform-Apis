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

const bookSeat = async (id: string, seat: number) => {
  const cinema = await Cinema.findOne({ _id: id });

  if (!cinema) {
    return {
      success: false,
      error: "Cinema not found",
    };
  }

  const seatIndex = cinema.seats.findIndex((i) => i.seatNumber === seat);

  cinema.seats[seatIndex].isAvailable = false;

  await cinema.save();

  return {
    success: true,
    message: "Seat booked successfully",
  };
};

export const cinemasServices = {
  getCinemas,
  createCinema,
  bookSeat,
};
