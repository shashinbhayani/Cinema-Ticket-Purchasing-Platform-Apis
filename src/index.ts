import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { cinemaRouter } from "./routes/index.ts/cinemas.routes";
import mongoose from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();
mongoose.connect(process.env.DB_URL as string);

const app: Express = express();
const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cinema Ticket Purchasing Platform",
      version: "1.0.0",
      description:
        "API documentation for the Cinema Ticket Purchasing Platform",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Cinema: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for a cinema",
            },
            name: {
              type: "string",
              description: "The name of the cinema",
            },
            seats: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  seatNumber: {
                    type: "integer",
                    description: "The seat number",
                  },
                  isAvailable: {
                    type: "boolean",
                    description: "Availability of the seat",
                  },
                },
                required: ["seatNumber", "isAvailable"],
              },
            },
          },
          required: ["name", "seats"],
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts"], // Path to the API docs
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/cinemas", cinemaRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(
    `[server]: Api Doc is running at http://localhost:${port}/api-docs`,
  );
});
