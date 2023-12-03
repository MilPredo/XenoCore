import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { UserService } from "../services/userService";
import { SupplierService } from "../services/supplierService";
import { ProductService } from "../services/productService";
import { CustomerService } from "../services/customerService";
interface CustomerRequestBody {
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_number: string;
  notes?: string;
}

export class CustomerController {
  private customerService: CustomerService;

  constructor(fastify: FastifyInstance) {
    this.customerService = new CustomerService(fastify);
  }

  async addCustomer(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { first_name, middle_name, last_name, contact_number, notes } =
        request.body as CustomerRequestBody;
      console.log(request.body);
      if (!first_name) throw "first name  is required.";
      if (!middle_name) throw "middle name is required.";
      if (!last_name) throw "last name is required.";
      if (!contact_number) throw "contact number is required.";
      const result = await this.customerService.addCustomer(
        first_name,
        middle_name,
        last_name,
        contact_number,
        notes,
      );
      reply.status(200).send(result);
    } catch (error) {
      console.log("error");
      console.log((error as any).detail);
      console.log(error);
      reply.status(500).send({ message: (error as { detail: string }).detail });
    }
  }

  async getAllCustomers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const {
        page,
        first_name,
        middle_name,
        last_name,
        // contact_number,
      } = request.query as any; // Query parameters for pagination
      console.log(request.query);
      const result = await this.customerService.getAllCustomers(
        page,
        16,
        first_name,
        middle_name,
        last_name
        // address,
        // contact_number,
        // email
      );
      reply
        .status(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({
          rows: result.customers,
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
