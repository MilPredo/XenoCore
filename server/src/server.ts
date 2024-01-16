import Fastify from "fastify";
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
import supplierRoutes from "./routes/supplier";
import productRoutes from "./routes/product";
import customerRoutes from "./routes/customer";
import purchasesRoutes from "./routes/purchases";
import salesRoutes from "./routes/sales";
import dashboardRoutes from "./routes/dashboard";

const app = Fastify({ logger: true });
const port = 1338; 
app.register(fastifyPostgres, {
  user: "otsxmkfc",
  host: "rain.db.elephantsql.com",
  database: "otsxmkfc",
  password: "Yq80wlq6E7pmcacRxRPK3gaLJQADPPrO",
  port: 5432, //5432 1337
});
// app.register(fastifyPostgres, {
//   user: "postgres",
//   host: "localhost",
//   database: "test",
//   password: "postgres",
//   port: 5432, //5432 1337
// });
// Register the fastify-jwt plugin with your secret key
// app.register(jwt, {
//   secret: "asdjkl", // Replace with your secret key
// });
app.register(fastifyFormbody);
app.register(fastifyCookie);
app.register(fastifySession, {
  secret:
    "never gonna give you up, never gonna let you down, hee hee! se no! demo sou nan ja dame, se no! sawattara taiho!",
  saveUninitialized: false, // Don't save uninitialized sessions
  cookie: {
    secure: false, // Set to true in a production environment with HTTPS
    // sameSite: "none"

  },
});

app.register(authRoutes, { prefix: "/user" });
app.register(inventoryRoutes);
app.register(userRoutes);
app.register(supplierRoutes);
app.register(productRoutes);
app.register(customerRoutes);
app.register(purchasesRoutes);
app.register(salesRoutes);
app.register(dashboardRoutes);
app.register(fastifyCors, {
  // Set your desired CORS options here
  origin: ["http://127.0.0.1:5173", "http://localhost:5173", "http://192.168.1.135:5173", "http://0.0.0.0:5173", "http://192.168.5.202:5173"], // Replace with your front-end origin
  methods: "GET,POST,PUT,PATCH,DELETE",
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

app.get("/checkauth", async function handler(request, reply) {
  console.log(request.session.sessionId);
  return { ...request.session };
});

// Handle interrupt signals
process.on('SIGINT', async () => {
  try {
    // Close the Fastify server
    await app.close();
    console.log('Server closed on interrupt signal');
    process.exit(0);
  } catch (err) {
    console.error('Error closing server:', err);
    process.exit(1);
  }
});

// Handle termination signals
process.on('SIGTERM', async () => {
  try {
    // Close the Fastify server
    await app.close();
    console.log('Server closed on termination signal');
    process.exit(0);
  } catch (err) {
    console.error('Error closing server:', err);
    process.exit(1);
  }
});

// Run the server!
const start = async () => {
  try {
    await app.listen({ port: port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    await app.close();
    process.exit(1);
  }
};

start();
