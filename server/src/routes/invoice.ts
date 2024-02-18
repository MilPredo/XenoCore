import bcrypt from "bcrypt";
import { FastifyError, FastifyInstance } from "fastify";
import { Pool } from "pg";
import checkAccess from "../middleware/userAccess";
import { UserController } from "../controllers/userController";
import { SupplierController } from "../controllers/supplierController";
import { ProductController } from "../controllers/productController";
import { SalesController } from "../controllers/salesController";
import { InvoiceController } from "../controllers/invoiceController";

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

export default async function invoiceRoutes(fastify: FastifyInstance) {
  const invoiceController = new InvoiceController(fastify);
  fastify.get(
    "/invoice",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await invoiceController.getRequests(request, reply);
    }
  );

  fastify.get(
    "/invoice/:id",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await invoiceController.getRequestItems(request, reply);
    }
  );

  fastify.post(
    "/invoice",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await invoiceController.addRequests(request, reply);
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
