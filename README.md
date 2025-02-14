# Cinema-Ticket-Purchasing-Platform-Apis

## Overview

This project is a Cinema Ticket Purchasing Platform API built with Express and TypeScript. It allows users to create cinemas, book seats, and view available cinemas.

## Prerequisites

- Node.js (v20 or higher)
- npm (v6 or higher)
- MongoDB

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/your-username/cinema-ticket-portal-apis.git
cd cinema-ticket-portal-apis
```

2. Install dependencies:

```sh
yarn
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```env
MONGO_URI=your_mongodb_connection_string
PORT=your_port_number
```

4. Start the development server:

```sh
yarn dev
```

The server should now be running at `http://localhost:your_port_number`.

## API Documentation

The API documentation is available at `http://localhost:your_port_number/api-docs` when the development server is running. It provides detailed information about the available endpoints, request parameters, and response formats.

To generate the API documentation, we use Swagger. You can view and interact with the API documentation by navigating to the `/api-docs` endpoint in your browser.

### Example Endpoints

- **GET /cinemas**: Retrieve a list of all cinemas.
- **POST /cinemas**: Create a new cinema.
- **GET /cinemas/:id/book/:seat**: Retrieve details of a specific cinema.
- **POST /cinemas/:id/seats/purchase-two-consecutive**: Book a seat in a specific cinema.

For more detailed information, please refer to the API documentation at `http://localhost:your_port_number/api-docs`.
