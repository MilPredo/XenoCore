import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
/*
Service:
  Responsibility: Services contain the application's business logic. They encapsulate the functionality related to specific entities or features and are responsible for data manipulation, validation, and communication with the data storage layer (e.g., database).
  Concerns:
    Business logic: Implementing the core functionality of the application, including data manipulation and validation.
    Data access: Interacting with the database or other external data sources to retrieve or persist data.
    Encapsulation: Hiding the implementation details of the business logic from the controller, promoting separation of concerns.
*/
export class UserService {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllUsers(
    page: number = 1,
    pageSize: number = 16,
    username: string,
    first_name: string,
    middle_name: string,
    last_name: string
  ) {
    const offset = (page - 1) * pageSize;
      const result = await this.fastify.pg.query(
        `
        SELECT id, username, first_name, middle_name, last_name, occupation
        FROM users
        WHERE (LOWER(username) LIKE '%' || $1 || '%' OR $1 IS NULL)
          AND (LOWER(first_name) LIKE '%' || $2 || '%' OR $2 IS NULL)
          AND (LOWER(middle_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
          AND (LOWER(last_name) LIKE '%' || $4 || '%' OR $4 IS NULL)
        ORDER BY id DESC
        LIMIT $5 OFFSET $6;
`,
        [username, first_name, middle_name, last_name, pageSize, offset]
      );
      const users = result.rows;

      // Fetch total count of users
      const totalCountResult = await this.fastify.pg.query(
        `
        SELECT COUNT(*) FROM users
        WHERE (LOWER(username) LIKE '%' || $1 || '%' OR $1 IS NULL)
          AND (LOWER(first_name) LIKE '%' || $2 || '%' OR $2 IS NULL)
          AND (LOWER(middle_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
          AND (LOWER(last_name) LIKE '%' || $4 || '%' OR $4 IS NULL);
      `,
        [username, first_name, middle_name, last_name]
      );
      const totalCount = parseInt(totalCountResult.rows[0].count, 10);

      return { users, totalCount };
  }

  async getUserById(id: number) {
    try {
      const userQuery = `
        SELECT id, username, first_name, middle_name, last_name, occupation
        FROM users
        WHERE id = $1
      `;
      const accessQuery = `
        SELECT "canCreate", "canRead", "canUpdate", "canDelete"
        FROM user_management_access
        WHERE userid = $1
      `;

      const [user, user_management_access] = await Promise.all([
        this.fastify.pg.query(userQuery, [id]),
        this.fastify.pg.query(accessQuery, [id]),
      ]);

      return { user, user_management_access };
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error executing SQL query:", error.message);
      }

      throw new Error("Error fetching user profile from the database");
    }
  }

  async createUser(userData: any) {
    const { rows } = await this.fastify.pg.query(
      "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *",
      [userData.name, userData.email]
    );
    return rows[0];
  }

  async updateUser(userId: number, updatedData: any) {
    const { rows } = await this.fastify.pg.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [updatedData.name, updatedData.email, userId]
    );
    return rows[0];
  }

  async deleteUser(userId: number) {
    const { rows } = await this.fastify.pg.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId]
    );
    return rows[0];
  }
}
