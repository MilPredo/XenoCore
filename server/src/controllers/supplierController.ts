import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/userService";
import { SupplierService } from "../services/supplierService";
interface SupplierRequestBody {
  supplier_name: string;
  address: string;
  contact_number: string;
  email: string;
  notes: string;
}

export class SupplierController {
  private supplierService: SupplierService;

  constructor(fastify: FastifyInstance) {
    this.supplierService = new SupplierService(fastify);
  }

  async addSupplier(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { supplier_name, address, contact_number, email, notes } = request.body as SupplierRequestBody;
      const result = await this.supplierService.addSupplier(supplier_name, address, contact_number, email, notes);
      reply.status(200).send(result);
    } catch (error) {
      // console.log("error");
      // console.log((error as any).detail);
      // console.log(error);
      reply.status(500).send({ message: (error as { detail: string }).detail });
    }
  }

  async getAllSuppliers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { page, supplier_name, address, contact_number, email } = request.query as any; // Query parameters for pagination
      console.log(request.query)
      const result = await this.supplierService.getAllSuppliers(
        page,
        16,
        supplier_name
        // address,
        // contact_number,
        // email
      );
      reply.status(200).header('Content-Type', 'application/json; charset=utf-8').send({
        rows: result.suppliers,
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
