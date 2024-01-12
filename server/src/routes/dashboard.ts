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
}
