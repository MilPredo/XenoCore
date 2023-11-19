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
      preHandler: checkAccess(fastify, ["read"], "user_management_access"),
    },
    async (request, reply) => {
      console.log(request.query);
      // const limit = (request.query as any).limit || 100;
      let limit = 16;
      let { page, username, first_name, middle_name, last_name } =
        request.query as any; // Query parameters for pagination
      page = page - 1 || 0;
      console.log(page);
      const offset = page * limit;
      try {
        const users = await fastify.pg.query(
          `
  SELECT username, first_name, middle_name, last_name
  FROM users
  WHERE (username LIKE '%' || $1 || '%' OR $1 IS NULL)
    AND (first_name LIKE '%' || $2 || '%' OR $2 IS NULL)
    AND (middle_name LIKE '%' || $3 || '%' OR $3 IS NULL)
    AND (last_name LIKE '%' || $4 || '%' OR $4 IS NULL)
  ORDER BY id DESC
  LIMIT $5 OFFSET $6;
`,
          [username, first_name, middle_name, last_name, limit, offset]
        );
        const count = await fastify.pg.query(
          `
  SELECT COUNT(*) FROM users
  WHERE (username LIKE '%' || $1 || '%' OR $1 IS NULL)
    AND (first_name LIKE '%' || $2 || '%' OR $2 IS NULL)
    AND (middle_name LIKE '%' || $3 || '%' OR $3 IS NULL)
    AND (last_name LIKE '%' || $4 || '%' OR $4 IS NULL);
        `,
          [username, first_name, middle_name, last_name]
        );
        reply
          .status(200)
          .send({ rows: users.rows, count: count.rows[0].count });
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
