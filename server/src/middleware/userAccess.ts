import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

type CRUD = "canCreate" | "canRead" | "canUpdate" | "canDelete";
type accessTable =
  | "user_management_access"
  | "inventory_access"
  | "transaction_access";

const checkAccess = (
  app: FastifyInstance,
  operation: CRUD[],
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
      SELECT ${operation.map((column) => `"${column}"`).join(", ")}
      FROM "${table}"
      WHERE userid = $1
      `,
      [userId]
    );
    if (rows.length <= 0) {
      return done(new Error("User does not have authorization set."));
    } else if (rows[0]) {
      operation.forEach((ops) => {
        if (!rows[0][`${ops}`])
          return done(new Error("User is not authorized."));
      });
      return done();
    } else {
      return done(new Error("User is not authorized."));
    }
  };
};

export default checkAccess;
