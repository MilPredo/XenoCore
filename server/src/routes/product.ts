import bcrypt from "bcrypt";
import { FastifyError, FastifyInstance } from "fastify";
import { Pool } from "pg";
import checkAccess from "../middleware/userAccess";
import { UserController } from "../controllers/userController";
import { SupplierController } from "../controllers/supplierController";
import { ProductController } from "../controllers/productController";

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

export default async function productRoutes(fastify: FastifyInstance) {
  const productController = new ProductController(fastify);
  fastify.get(
    "/product",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await productController.getAllProducts(request, reply)
    }
  );

  fastify.post(
    "/product",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await productController.addProduct(request, reply)
    }
  );

  fastify.patch(
    "/product",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await productController.updateProduct(request, reply)
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
