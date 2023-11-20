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

export default async function authRoutes(fastify: FastifyInstance) {
  // User registration route
  fastify.post<{ Body: UserRequestBody }>(
    "/register",
    {
      preHandler: [
        checkAccess(
          fastify,
          ["canCreate", "canUpdate"],
          "user_management_access"
        ),
      ],
    },
    async (request, reply) => {
      const { username, password, first_name, middle_name, last_name } =
        request.body;
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const client = await fastify.pg.connect();

        try {
          await client.query("BEGIN");

          // Insert into users table
          const userResult = await client.query(
            `INSERT INTO users(username, password, first_name, middle_name, last_name)
             VALUES($1, $2, $3, $4, $5)
             RETURNING id`,
            [
              username,
              hashedPassword,
              first_name || null,
              middle_name || null,
              last_name || null,
            ]
          );

          const user_id = userResult.rows[0].id;

          // Insert into user_management_access table using the user_id obtained from the previous insert
          await client.query(
            `INSERT INTO user_management_access(userid)
             VALUES($1)`,
            [user_id]
          );

          await client.query("COMMIT");
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
        reply.send({ message: "User registered successfully" });
      } catch (error) {
        console.log((error as any).detail);
        console.log(error);
        reply
          .status((error as any).code === "23505" ? 409 : 500)
          .send({ message: (error as { detail: string }).detail });
      }
    }
  );

  // User login route for authentication
  fastify.post<{ Body: UserRequestBody }>("/login", async (request, reply) => {
    const { username, password } = request.body;
    try {
      if ((request.session as any).user) {
        reply.send({
          user: (request.session as any).user,
          message: "User already logged in",
        });
        return;
      }
      const { rows } = await fastify.pg.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (await bcrypt.compare(password, rows[0].password)) {
        const { password, ...rest } = rows[0] as { [key: string]: any };
        (request.session as any).user = { ...rest };
        console.log((request.session as any).user);
        // reply.setCookie('sessionID', 'yourSessionID', {
        //   httpOnly: true, // Makes the cookie accessible only via HTTP
        //   secure: true,   // Ensures the cookie is sent over HTTPS (in production)
        // });
        reply.send({ user: rest, message: "Login successful", modules: {} });
      } else {
        reply.status(401).send({ error: "Authentication failed" });
        // const token = fastify.jwt.sign({ username }, { expiresIn: "1h" });
        // reply.send({ token });
      }
    } catch (error) {
      const fastifyError = error as FastifyError;
      fastifyError.code;
      reply
        .status(500)
        .send({ error: error, message: "Authentication failed" });
    }
  });
  fastify.post("/logout", (request, reply) => {
    try {
      request.session.destroy();
      console.log("session: ", request.session);
      reply.send({ user: null, message: "logged out" });
    } catch (error) {
      const fastifyError = error as FastifyError;
      fastifyError.code;
      reply.status(500).send({ error: error, message: "Logout failed" });
    }
  });
}
