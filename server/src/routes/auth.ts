import bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import { Pool } from "pg";

interface UserRequestBody {
  username: string;
  password: string;
}

export default async function userRoutes(
  fastify: FastifyInstance,
  opts: { db: Pool; secretKey: string }
) {
  const db = opts.db;
  const secretKey = opts.secretKey;
  // User registration route
  fastify.post<{ Body: UserRequestBody }>(
    "/register",
    async (request, reply) => {
      const { username, password } = request.body;

      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        await db.query("INSERT INTO users(username, password) VALUES($1, $2)", [
          username,
          hashedPassword,
        ]);
        reply.send({ message: "User registered successfully" });
      } catch (error) {
        reply.status(500).send({ error: "Registration failed" });
      }
    }
  );

  // User login route for authentication
  fastify.post<{ Body: UserRequestBody }>("/login", async (request, reply) => {
    const { username, password } = request.body;

    try {
      const { rows } = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (
        rows.length === 0 ||
        !(await bcrypt.compare(password, rows[0].password))
      ) {
        reply.status(401).send({ error: "Authentication failed" });
      } else {
        const token = fastify.jwt.sign({ username }, { expiresIn: "1h" });
        reply.send({ token });
      }
    } catch (error) {
      reply.status(500).send({ error: "Authentication failed" });
    }
  });
}
