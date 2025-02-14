import mongoose from "mongoose";

export const cinemasSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seats: [
    {
      seatNumber: { type: Number, required: true },
      isAvailable: { type: Boolean, required: true },
    },
  ],
});

export const Cinema = mongoose.model("Cinema", cinemasSchema);
