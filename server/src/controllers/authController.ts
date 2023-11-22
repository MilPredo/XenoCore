import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/userService";

export class UserController {
  private userService: AuthService;

  constructor(fastify: FastifyInstance) {
    this.userService = new UserService(fastify);
  }