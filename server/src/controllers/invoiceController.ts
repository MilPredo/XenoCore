import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/userService";
import { SupplierService } from "../services/supplierService";
import { ProductService } from "../services/productService";
import { PurchaseService } from "../services/purchaseService";
import { SalesService } from "../services/saleService";
import { InvoiceService } from "../services/invoiceService";
interface SalesRequestBody {
  customer_id: string;
  product_id: string;
  quantity: string;
  ppu: number;
  cog: number;
  transaction_date?: Date;
  payment_method: number;
  remittance_status: number;
  user_id: number;
  user_type: string;
}

export class InvoiceController {
  private invoiceService: InvoiceService;

  constructor(fastify: FastifyInstance) {
    this.invoiceService = new InvoiceService(fastify);
  }

  // async addSales(request: FastifyRequest, reply: FastifyReply) {
  //   try {
  //     const sales = request.body as SalesRequestBody[];
  //     const result = await this.salesService.addSales(sales);
  //     reply.status(200).send(result);
  //   } catch (error) {
  //     console.log("error");
  //     console.log((error as any).detail);
  //     console.log(error);
  //     reply.status(500).send({ message: (error as { detail: string }).detail });
  //   }
  // }

  async getRequests(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, pageSize, request_id, order_by, order_direction } = request.query as {
        page?: number;
        pageSize?: number;
        request_id?: number | null;
        order_by?: "request_id" | "transaction_date" | "delivery_date";
        order_direction?: "asc" | "desc" | "ASC" | "DESC";
      }; // Query parameters for pagination
      console.log(request.query);
      const result = await this.invoiceService.getRequests(
        page,
        pageSize,
        request_id ?? null,
        order_by,
        order_direction
        // address,
        // contact_number,
        // email
      );
      reply.status(200).header("Content-Type", "application/json; charset=utf-8").send({
        rows: result.requests,
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