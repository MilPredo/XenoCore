import { FastifyInstance } from "fastify";

export class ProductService {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllProducts(page: number = 1, pageSize: number = 16, product_name: string) {
    const offset = (page - 1) * pageSize;
    const result = await this.fastify.pg.query(
      `
        SELECT *
        FROM product
        WHERE (LOWER(product_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
        ORDER BY id DESC
        LIMIT $2 OFFSET $3;
`,
      [product_name, pageSize, offset]
    );
    const products = result.rows;

    // Fetch total count of products
    const totalCountResult = await this.fastify.pg.query(
      `
        SELECT COUNT(*) FROM product
        WHERE (LOWER(product_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
      `,
      [product_name, pageSize, offset]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { products, totalCount };
  }

  /*
  id
  product_name
  default_cog
  default_ppu
  category
  papers
  initial_qty
  reorder_level
  current_qty
  stock_status
  */
  async addProduct(product_name: string, description: string, default_cog?: number, default_ppu?: number, ) {
    await this.fastify.pg.query(
      `
        INSERT INTO product (product_name, default_cog, default_ppu, description)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [product_name, default_cog, default_ppu, description]
    );
    //return { suppliers, totalCount };
  }
}
