import { FastifyInstance } from "fastify";

export class CustomerService {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllCustomers(
    page: number = 1,
    pageSize: number = 16,
    first_name: string,
    middle_name: string,
    last_name: string
  ) {
    const offset = (page - 1) * pageSize;
    const result = await this.fastify.pg.query(
      `
        SELECT *
        FROM suppliers
        WHERE (LOWER(customer_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
        AND (LOWER(middle_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
        AND (LOWER(last_name) LIKE '%' || $4 || '%' OR $4 IS NULL)
        ORDER BY id DESC
        LIMIT $2 OFFSET $3;
`,
      [first_name, middle_name, last_name, pageSize, offset]
    );
    const customers = result.rows;

    // Fetch total count of customers
    const totalCountResult = await this.fastify.pg.query(
      `
        SELECT COUNT(*) FROM customers
        WHERE (LOWER(username) LIKE '%' || $1 || '%' OR $1 IS NULL)
        AND (LOWER(middle_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
        AND (LOWER(last_name) LIKE '%' || $4 || '%' OR $4 IS NULL)
      `,
      [first_name, middle_name, last_name, pageSize, offset]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { customers, totalCount };
  }

  async addCustomer(
    first_name: string,
    middle_name: string,
    last_name: string,
    address: string,
    contact: string,
    email: string,
    notes: string
  ) {
    await this.fastify.pg.query(
      `
        INSERT INTO customers (first_name, middle_name, last_name, address, contact, email, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
      [first_name, middle_name, last_name, address, contact, email, notes]
    );
    //return { customers, totalCount };
  }
}
