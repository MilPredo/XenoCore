import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";  
import { DashboardService } from "../services/dashboardService";
interface InventoryRequestBody {
  product_name: string;
  category: string;
  default_cog?: number;
  default_ppu?: number;
  papers?: boolean;
  initial_qty?: number;
  reorder_level?: number;
  current_qty?: number;
  stock_status?: string;
  description?: string;
}

export class DashboardController {
  private dashboardService: DashboardService;

  constructor(fastify: FastifyInstance) {
    this.dashboardService = new DashboardService(fastify);
  }

  async getTotalCog(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { start_date, end_date} =
        request.query as {
          start_date?: Date;
          end_date?: Date};
      console.log(request.query); 
      const result = await this.dashboardService.getTotalCog(start_date, end_date);
      reply
        .status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(result);
    } catch (error) {
      // console.log("error");
      console.log((error as any).detail);
      console.log(error);
      reply
        //.status((error as any).code === "23505" ? 409 : 500)
        .status(500)
        .send({ message: (error as { detail: string }).detail });
    }
  }

  async getTotalPpu(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { start_date, end_date} =
        request.query as {
          start_date?: Date;
          end_date?: Date};
      console.log(request.query); 
      const result = await this.dashboardService.getTotalPpu(start_date, end_date);
      reply
        .status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(result);
    } catch (error) {
      // console.log("error");
      console.log((error as any).detail);
      console.log(error);
      reply
        //.status((error as any).code === "23505" ? 409 : 500)
        .status(500)
        .send({ message: (error as { detail: string }).detail });
    }
  }

  // async getUserById(request: FastifyRequest, reply: FastifyReply) {
  //   try {
  //     const { id } = request.params as any;
  //     const result = await this.userService.getUserById(id);
  //     reply.status(200).send(result);
  //   } catch (error) {
  //     // console.log("error");
  //     // console.log((error as any).detail);
  //     // console.log(error);
  //     reply
  //       .status(500)
  //       .status(500)
  //       .send({ message: (error as { detail: string }).detail });
  //   }
  // }

  async updateSuppliers(request: FastifyRequest, reply: FastifyReply) {
    // Logic to update a user
  }

  async deleteSuppliers(request: FastifyRequest, reply: FastifyReply) {
    // Logic to delete a user
  }
}
