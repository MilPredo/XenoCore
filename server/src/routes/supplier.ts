import bcrypt from "bcrypt";
import { FastifyError, FastifyInstance } from "fastify";
import { Pool } from "pg";
import checkAccess from "../middleware/userAccess";
import { UserController } from "../controllers/userController";
import { SupplierController } from "../controllers/supplierController";

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

export default async function supplierRoutes(fastify: FastifyInstance) {
  const supplierController = new SupplierController(fastify);
  fastify.get(
    "/supplier",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await supplierController.getAllSuppliers(request, reply)
    }
  );

  fastify.post(
    "/supplier",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await supplierController.addSupplier(request, reply)
    }
  );

  // fastify.get(
  //   "/user/:id",
  //   {
  //     preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
  //   },
  //   async (request, reply) => {
  //     await userController.getUserById(request, reply);
  //   }
  // );
}
