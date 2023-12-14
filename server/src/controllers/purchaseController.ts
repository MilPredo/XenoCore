import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/userService";
import { SupplierService } from "../services/supplierService";
import { ProductService } from "../services/productService";
import { PurchaseService } from "../services/purchaseService";
interface PurchaseRequestBody {
  product_id: string;
  quantity: string;
  cog?: number;
  transaction_date?: Date;
  delivery_date?: Date;
  delivery_status?: string;
  notes?: string;
  user_id: number;
  supplier_id?: number;
}

export class PurchaseController {
  private purchaseService: PurchaseService;

  constructor(fastify: FastifyInstance) {
    this.purchaseService = new PurchaseService(fastify);
  }

  async addProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const purchases = request.body as PurchaseRequestBody[];
      const result = await this.purchaseService.addPurchases(purchases);
      reply.status(200).send(result);
    } catch (error) {
      console.log("error");
      console.log((error as any).detail);
      console.log(error);
      reply.status(500).send({ message: (error as { detail: string }).detail });
    }
  }

  async getAllPurchases(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, pageSize, product_name, order_by, order_direction } = request.query as {
        page?: number;
        pageSize?: number;
        product_name?: string;
        order_by?: "product_name" | "product_id" | "transaction_date" | "delivery_date";
        order_direction?: "asc" | "desc" | "ASC" | "DESC";
      }; // Query parameters for pagination
      console.log(request.query);
      const result = await this.purchaseService.getAllPurchases(
        page,
        pageSize,
        product_name ?? "",
        order_by,
        order_direction
        // address,
        // contact_number,
        // email
      );
      reply.status(200).header("Content-Type", "application/json; charset=utf-8").send({
        rows: result.products,
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
