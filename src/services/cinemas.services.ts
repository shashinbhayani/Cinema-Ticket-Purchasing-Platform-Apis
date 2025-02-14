import { Mutex } from "async-mutex";
import { Cinema } from "../models/cinemas.models";

const mutex = new Mutex();

type TCreateCinema = {
  name: string;
  seats: number;
};

const getCinemas = async () => {
  const cinemas = await Cinema.find();
  return {
    success: true,
    message: "Cinemas retrieved successfully",
    data: cinemas,
  };
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
  const release = await mutex.acquire();
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
  release();
  return {
    success: true,
    message: "Seat booked successfully",
  };
};

const bookTwoConsecutiveSeats = async (id: string) => {
  const release = await mutex.acquire();

  console.log("id", id);
  const cinema = await Cinema.findOne({ _id: id });
  if (!cinema) {
    release();
    return {
      success: false,
      error: "Cinema not found",
    };
  }

  for (let i = 0; i < cinema.seats.length - 1; i++) {
    if (cinema.seats[i].isAvailable && cinema.seats[i + 1].isAvailable) {
      cinema.seats[i].isAvailable = false;
      cinema.seats[i + 1].isAvailable = false;
      await cinema.save();
      release();
      return {
        success: true,
        message: "Two consecutive seats booked",
        seats: [cinema.seats[i].seatNumber, cinema.seats[i + 1].seatNumber],
      };
    }
  }
  release();
  return {
    success: false,
    message: "No two consecutive seats available",
  };
};

export const cinemasServices = {
  getCinemas,
  createCinema,
  bookSeat,
  bookTwoConsecutiveSeats,
};
