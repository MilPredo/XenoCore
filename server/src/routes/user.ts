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
  fastify.get(
    "/user",
    {
      preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
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
          SELECT id, username, first_name, middle_name, last_name
          FROM users
          WHERE (LOWER(username) LIKE '%' || $1 || '%' OR $1 IS NULL)
            AND (LOWER(first_name) LIKE '%' || $2 || '%' OR $2 IS NULL)
            AND (LOWER(middle_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
            AND (LOWER(last_name) LIKE '%' || $4 || '%' OR $4 IS NULL)
          ORDER BY id DESC
          LIMIT $5 OFFSET $6;
`,
          [username, first_name, middle_name, last_name, limit, offset]
        );
        const count = await fastify.pg.query(
          `
          SELECT COUNT(*) FROM users
          WHERE (LOWER(username) LIKE '%' || $1 || '%' OR $1 IS NULL)
            AND (LOWER(first_name) LIKE '%' || $2 || '%' OR $2 IS NULL)
            AND (LOWER(middle_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
            AND (LOWER(last_name) LIKE '%' || $4 || '%' OR $4 IS NULL);
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

  fastify.get(
    "/user/:id",
    {
      preHandler: checkAccess(fastify, ["canRead"], "user_management_access"),
    },
    async (request, reply) => {
      console.log(request.query);
      // const limit = (request.query as any).limit || 100;
      const { id } = request.params as { id: number };
      console.log("id type", typeof id);
      console.log("id", id);
      try {
        const user = await fastify.pg.query(
          `
          SELECT id, username, first_name, middle_name, last_name
          FROM users
	        WHERE id = $1
        `,
          [id]
        );
        const user_management_access = await fastify.pg.query(
          `
          SELECT "canCreate", "canRead", "canUpdate", "canDelete"
	        FROM user_management_access
	        WHERE userid = $1
        `,
          [id]
        );
        // let all_access
        console.log("user", user.rows);
        console.log("access", user_management_access.rows);
        if (user.rows) {
          console.log(user.rows);
          reply.status(200).send({
            user: user.rows[0],
            access: {
              user_management_access: user_management_access.rows[0],
            },
          });
        } else {
          reply.send("hello");
        }
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
