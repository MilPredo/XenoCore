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
  fastify.post<{ Body: UserRequestBody }>(
    "/register",    
    // {
    //   preHandler: [checkAccess(fastify, "create")],
    // },
    async (request, reply) => {
      const { username, password, first_name, middle_name, last_name } =
        request.body;
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await fastify.pg.query(
          "INSERT INTO users(username, password, first_name, middle_name, last_name) VALUES($1, $2, $3, $4, $5)",
          [username, hashedPassword, first_name || null, middle_name || null, last_name || null]
        );
        reply.send({ message: "User registered successfully" });
      } catch (error) {
        const fastifyError = error as FastifyError;
        console.log(fastifyError.message);
        reply.status(500).send({ error: "Registration failed" });
      }
    }
  );

  // User login route for authentication
  fastify.post<{ Body: UserRequestBody }>("/login", async (request, reply) => {
    const { username, password } = request.body;

    try {
      const { rows } = await fastify.pg.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (
        rows.length === 0 ||
        !(await bcrypt.compare(password, rows[0].password))
      ) {
        reply.status(401).send({ error: "Authentication failed" });
      } else {
        // const token = fastify.jwt.sign({ username }, { expiresIn: "1h" });
        // reply.send({ token });
        (request.session as any).user = { name: "max" };
        reply.send({ message: "Login successful" });
      }
    } catch (error) {
      const fastifyError = error as FastifyError;
      fastifyError.code;
      reply.status(500).send({ error: "Authentication failed" });
    }
  });
  fastify.post("/logout", (request, reply) => {
    request.session.destroy();
    reply.send("logged out");
  });
}
