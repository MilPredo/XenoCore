import bcrypt from "bcrypt";
import { FastifyError, FastifyInstance } from "fastify";
import { Pool } from "pg";
import checkAccess from "../middleware/userAccess";
import { UserController } from "../controllers/userController";
import { SupplierController } from "../controllers/supplierController";
import { ProductController } from "../controllers/productController";
import { PurchaseController } from "../controllers/purchaseController";

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

export default async function purchasesRoutes(fastify: FastifyInstance) {
  const purchasesController = new PurchaseController(fastify);
  // fastify.get(
  //   "/product",
  //   // {
  //   //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
  //   // },
  //   async (request, reply) => {
  //     await productController.addProduct(request, reply)
  //   }
  // );

  fastify.post(
    "/purchases",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await purchasesController.addProduct(request, reply);
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
