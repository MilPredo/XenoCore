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

export default async function userRoutes(fastify: FastifyInstance) {
  // User registration route
  fastify.get(
    "/user",
    {
      preHandler: checkAccess(fastify, "read", "user_management_access"),
    },
    async (request, reply) => {
      console.log(request.query);
      // const limit = (request.query as any).limit || 100;
      let { page } = request.query as any; // Query parameters for pagination
      page = page - 1 || 0
      console.log(page)
      const offset = page * 10;
      try {
        const users = await fastify.pg.query(
          "SELECT username, first_name, middle_name, last_name FROM users ORDER BY id LIMIT $1 OFFSET $2",
          [10, offset]
        );
        const count = await fastify.pg.query(
          "SELECT COUNT(*) FROM users"
        );
        reply.send({rows:users.rows,count:count.rows[0].count});
      } catch (error) {
        console.log((error as any).detail);
        console.log(error);
        reply
          .status((error as any).code === "23505" ? 409 : 500)
          .send({ message: (error as { detail: string }).detail });
      }
    }
  );
}
