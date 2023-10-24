import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

type CRUD = "create" | "read" | "update" | "delete";
type accessTable =
  | "user_management_access"
  | "inventory_access"
  | "transaction_access";

const checkAccess = (
  app: FastifyInstance,
  operation: CRUD,
  table: accessTable
) => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
    done: (error?: Error) => void
  ) => {
    //check if user is logged in
    if (!(request.session as any).user) {
      // Return an error response and halt further processing
      console.log("\n\nhallloooo");
      return done(new Error("User is not authenticated."));
    }
    console.log((request.session as any).user);
    // Get user ID from session
    const userId = (request.session as any).user.id;
    // Check if user has access
    const { rows } = await app.pg.query(
      `
      select "${operation}" 
      from "${table}" 
      where userid = $1
      `,
      [userId]
    );
    if (rows.length <= 0) {
      return done(new Error("User does not have authorization set."));
    } else if (rows[0].read) {
      console.log(rows[0]);
      return done();
    } else {
      return done(new Error("User is not authorized."));
    }
    // const hasAccess = results[0][operation];

    // if (!hasAccess) {
    //   reply.code(403).send("Access denied");
    //   return;
    // }
  };
};

export default checkAccess;
