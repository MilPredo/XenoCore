import bcrypt from "bcrypt";
import { FastifyError, FastifyInstance } from "fastify";
import { Pool } from "pg";
import checkAccess from "../middleware/userAccess";

interface UserRequestBody {
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

// Define the session object type
interface UserSession {
  loggedIn: boolean;
  // Add other session properties if needed
}

export default async function inventoryRoutes(fastify: FastifyInstance) {
  // User registration route
  fastify.get("/inventory", async (request, reply) => {
    console.log(request.query);
    try {
      //await fastify.pg.query();
      reply.send([
        {
          category: "Machines",
          product: "Hemodialysis Machine",
          cost_of_goods: 25000,
          price_per_unit: 45000,
          reorder_level: 2,
          current_stock: 5,
        },
        {
          category: "Machines",
          product: "Hemodialysis Machine",
          cost_of_goods: 25000,
          price_per_unit: 45000,
          reorder_level: 2,
          current_stock: 5,
        },
      ]);
      //reply.send({ message: "User registered successfully" });
    } catch (error) {
      console.log((error as any).detail);
      console.log(error);
      reply
        .status((error as any).code === "23505" ? 409 : 500)
        .send({ message: (error as { detail: string }).detail });
    }
  });
}
