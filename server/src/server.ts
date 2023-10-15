import Fastify from "fastify";
import jwt from "@fastify/jwt";
import userRoutes from "./routes/auth";
import { Pool } from "pg";
import fastifyPostgres from "@fastify/postgres";

const app = Fastify({ logger: true });
const port = 1338;

app.register(fastifyPostgres, {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 1337,
});
// Register the fastify-jwt plugin with your secret key
app.register(jwt, {
  secret: "asdjkl", // Replace with your secret key
});

app.register(userRoutes, { prefix: "/user" });

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
};

// server.get<{
//   Querystring: IQuerystring,
//   Headers: IHeaders,
//   Reply: IReply
// }>('/auth', async (request, reply) => {
//   const { username, password } = request.query
//   const customerHeader = request.headers['h-Custom']
//   // do something with request data

//   // chaining .statusCode/.code calls with .send allows type narrowing. For example:
//   // this works
//   reply.code(200).send({ success: true });
//   // but this gives a type error
//   reply.code(200).send('uh-oh');
//   // it even works for wildcards
//   reply.code(404).send({ error: 'Not found' });
//   return `logged in!`
// })


start();
