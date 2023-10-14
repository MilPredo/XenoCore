import Fastify from "fastify";
import { Pool } from 'pg';
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 1337,
});

const app = Fastify({ logger: true });
const port = 1338;

// Declare a route
app.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

// Run the server!
const start = async () => {
  try {
    await app.listen({ port: port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
start()