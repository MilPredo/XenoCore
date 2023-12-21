import bcrypt from "bcrypt";
import { FastifyError, FastifyInstance } from "fastify";
import { Pool } from "pg";
import checkAccess from "../middleware/userAccess";
import { InventoryController } from "../controllers/inventoryController";

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
  const inventoryController = new InventoryController(fastify);

  // User registration route
  fastify.get(
    "/inventory",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await inventoryController.getAllInventory(request, reply);
    }
  );
}
