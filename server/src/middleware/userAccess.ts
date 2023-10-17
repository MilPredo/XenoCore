import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

type CRUD = 'create' | 'read' | 'update' | 'delete';

const checkAccess = (app: FastifyInstance, operation: CRUD) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    // Get user ID from session
    const userId = (request.session as any).user.id;

    // Check if user has access
    const results = await app.pg.query(
      `
        SELECT ${operation}
        FROM user_management_access
        WHERE userid = $1
      `,
      [userId]
    );
    console.log(results)
    // const hasAccess = results[0][operation];

    // if (!hasAccess) {
    //   reply.code(403).send("Access denied");
    //   return;
    // }
  };
};

export default checkAccess;
