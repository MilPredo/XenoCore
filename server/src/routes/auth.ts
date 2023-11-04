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
    async (request, reply) => {
      const { username, password, first_name, middle_name, last_name } =
        request.body;
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await fastify.pg.query(
          "INSERT INTO users(username, password, first_name, middle_name, last_name) VALUES($1, $2, $3, $4, $5)",
          [
            username,
            hashedPassword,
            first_name || null,
            middle_name || null,
            last_name || null,
          ]
        );
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
        
        reply.send({ user: rest, message: "Login successful" });
      } else {
        reply.status(401).send({ error: "Authentication failed" });
        // const token = fastify.jwt.sign({ username }, { expiresIn: "1h" });
        // reply.send({ token });
      }
    } catch (error) {
      const fastifyError = error as FastifyError;
      fastifyError.code;
      reply.status(500).send({ error: "Authentication failed" });
    }
  });
  fastify.post("/logout", (request, reply) => {
    request.session.destroy();
    reply.send({ message: "logged out" });
  });
}
