import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/userService";
import { SupplierService } from "../services/supplierService";
import { ProductService } from "../services/productService";
import { InventoryService } from "../services/inventoryService";
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

export class InventoryController {
  private inventoryService: InventoryService;

  constructor(fastify: FastifyInstance) {
    this.inventoryService = new InventoryService(fastify);
  }

  async getAllInventory(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, pageSize, product_name, id, order_direction } =
        request.query as {
          page?: number;
          pageSize?: number;
          product_name?: string;
          id?: string | number;
          // order_by?: "product_name" | "product_id" | "transaction_date" | "delivery_date";
          order_direction?: "asc" | "desc" | "ASC" | "DESC";
        }; // Query parameters for pagination
      console.log(request.query);
      console.log("id", id);
      const result = await this.inventoryService.getAllInventory(
        page,
        16,
        product_name ?? "",
        id,
        order_direction
        // address,
        // contact_number,
        // email
      );
      reply
        .status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          rows: result.inventory,
          count: result.totalCount,
        });
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
