import { Cinema } from "../models/cinemas.models";

const getCinemas = async () => {
  const cinemas = await Cinema.find();
  return cinemas;
};

export const cinemasServices = {
  getCinemas,
};
