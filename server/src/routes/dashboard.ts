import bcrypt from "bcrypt";
import { FastifyError, FastifyInstance } from "fastify";
import { Pool } from "pg";
import checkAccess from "../middleware/userAccess";
import { DashboardController } from "../controllers/dashboardController";

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

export default async function dashboardRoutes(fastify: FastifyInstance) {
  const dashboardController = new DashboardController(fastify);
  fastify.get(
    "/dashboard/total_inventory_value_and_cost",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await dashboardController.getTotalInventoryValueAndCost(request, reply);
    }
  );
  fastify.get(
    "/dashboard/cog",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await dashboardController.getTotalCog(request, reply);
    }
  );

  fastify.get(
    "/dashboard/ppu",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await dashboardController.getTotalPpu(request, reply);
    }
  );
  fastify.get(
    "/dashboard/topsales",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await dashboardController.getTopFiveProductSales(request, reply);
    }
  );

  fastify.get(
    "/dashboard/product_count",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await dashboardController.getProductCount(request, reply);
    }
  );

  fastify.get(
    "/dashboard/remittance_ratio",
    // {
    //   preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    // },
    async (request, reply) => {
      await dashboardController.getRemittanceRatio(request, reply);
    }
  );
}
