import { FastifyInstance } from "fastify";

export class SupplierService {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllSuppliers(
    page: number = 1,
    pageSize: number = 16,
    supplier_name: string
  ) {
    const offset = (page - 1) * pageSize;
    const result = await this.fastify.pg.query(
      `
        SELECT *
        FROM suppliers
        WHERE (LOWER(supplier_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
        ORDER BY id DESC
        LIMIT $5 OFFSET $6;
`,
      [supplier_name, pageSize, offset]
    );
    const suppliers = result.rows;

    // Fetch total count of suppliers
    const totalCountResult = await this.fastify.pg.query(
      `
        SELECT COUNT(*) FROM suppliers
        WHERE (LOWER(username) LIKE '%' || $1 || '%' OR $1 IS NULL)
      `,
      [supplier_name, pageSize, offset]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { suppliers, totalCount };
  }

  async addSupplier(
    supplier_name: string,
    address: string,
    contact: string,
    email: string,
    notes: string
  ) {
    await this.fastify.pg.query(
      `
        INSERT INTO suppliers (supplier_name, address, contact, email, notes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      [supplier_name, address, contact, email, notes]
    );
    //return { suppliers, totalCount };
  }

  //   async updateSupplier(id: number | string) {
  //     await this.fastify.pg.query(
  //       `
  //         UPDATE suppliers
  //         SET
  //         WHERE id = $1;
  // `,
  //       [id]
  //     );
  //     return { suppliers, totalCount };
  //   }
}
