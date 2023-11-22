import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/userService";

export class UserController {
  private userService: UserService;

  constructor(fastify: FastifyInstance) {
    this.userService = new UserService(fastify);
  }
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, username, first_name, middle_name, last_name } =
        request.query as any; // Query parameters for pagination
        console.log(this.userService)
        const result = await this.userService.getAllUsers(page, 16, username, first_name, middle_name, last_name)
      reply.status(200).send({ rows: result.users, count: result.totalCount, message: "success" });
    } catch (error) {
       console.log((error as any).detail);
      console.log(error);
      reply
        .status((error as any).code === "23505" ? 409 : 500)
        .send({ message: (error as { detail: string }).detail });
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    // Logic to get a user by ID
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    // Logic to create a user
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    // Logic to update a user
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    // Logic to delete a user
  }
}
