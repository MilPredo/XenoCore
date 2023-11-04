import Fastify from "fastify";
import jwt from "@fastify/jwt";
import { Pool } from "pg";
import fastifyPostgres from "@fastify/postgres";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import fastifyFormbody from "@fastify/formbody";
import fastifyCors from "@fastify/cors";
import checkAccess from "./middleware/userAccess";
import inventoryRoutes from "./routes/inventory";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";

const app = Fastify({ logger: true });
const port = 1338;

app.register(fastifyPostgres, {
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 1337, //5432 1337
});
// Register the fastify-jwt plugin with your secret key
// app.register(jwt, {
//   secret: "asdjkl", // Replace with your secret key
// });
app.register(fastifyFormbody);
app.register(fastifyCookie);
app.register(fastifySession, {
  cookieName: "sessionId",
  secret:
    "never gonna give you up, never gonna let you down, hee hee! se no! demo sou nan ja dame, se no! sawattara taiho!",
  //saveUninitialized: false, // Don't save uninitialized sessions
  cookie: {
    secure: false, // Set to true in a production environment with HTTPS
  },
});

app.register(authRoutes, { prefix: "/user" });
app.register(inventoryRoutes);
app.register(userRoutes);
app.register(fastifyCors, {
  // Set your desired CORS options here
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"], // Replace with your front-end origin
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
});
app.get('/profile', (request, reply) => {
  const user = (request.session as any).user; // Retrieve the user from the session

  if (user) {
    reply.send(`Welcome, ${user.username}`);
  } else {
    reply.send('User not logged in');
  }
});
// Declare a route
// app.get("/", async function handler(request, reply) {
//   return { hello: "world" };
// });
// app.get(
//   "/inventory",
//   {
//     preHandler: checkAccess(app, "read", "user_management_access"),
//   },
//   async (request, reply) => {
//     reply.send({ msg: "HALLO!!!!" });
//   }
// );
// app.post("/test", async function handler(request, reply) {
//   const { secret_word } = request.body as any;
//   if (secret_word === "banana") {
//     console.log(request.session.sessionId);
//     (request.session as any).authenticated = true;
//     reply.status(200);
//     return { ...request.session };
//   }
//   reply.status(200);
//   return { ...request.session };
// });

app.get("/checkauth", async function handler(request, reply) {
  console.log(request.session.sessionId);
  return { ...request.session };
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
