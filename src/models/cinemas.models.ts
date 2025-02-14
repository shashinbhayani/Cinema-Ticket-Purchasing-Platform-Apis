import mongoose, { Document } from "mongoose";

export const cinemasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seats: [
    {
      seatNumber: { type: Number, required: true },
      isAvailable: { type: Boolean, required: true },
    },
  ],
});

export type TCinema = Document & {
  name: string;
  seats: {
    seatNumber: number;
    isAvailable: boolean;
  }[];
};

export const Cinema = mongoose.model<TCinema>("Cinema", cinemasSchema);
