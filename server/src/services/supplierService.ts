import { FastifyInstance } from "fastify";

export class SupplierService {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllSuppliers(page: number = 1, pageSize: number = 16, supplier_name: string) {
    const offset = (page - 1) * pageSize;
    const result = await this.fastify.pg.query(
      `
        SELECT *
        FROM supplier
        WHERE (LOWER(supplier_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
        ORDER BY id DESC
        LIMIT $2 OFFSET $3;
`,
      [supplier_name, pageSize, offset]
    );
    const suppliers = result.rows;

    // Fetch total count of suppliers
    const totalCountResult = await this.fastify.pg.query(
      `
        SELECT COUNT(*) FROM supplier
        WHERE (LOWER(supplier_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
      `,
      [supplier_name]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { suppliers, totalCount };
  }

  async addSupplier(supplier_name: string, address: string, contact_number: string, email: string, notes: string) {
    await this.fastify.pg.query(
      `
        INSERT INTO supplier (supplier_name, address, contact_number, email, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      [supplier_name, address, contact_number, email, notes]
    );
    return { success: true };
    //return { suppliers, totalCount };
  }
}
