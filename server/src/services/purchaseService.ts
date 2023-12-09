import { FastifyInstance } from "fastify";

export class PurchaseService {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllPurchases(page: number = 1, pageSize: number = 16, product_name: string, order_by: "") {
    const offset = (page - 1) * pageSize;
    const result = await this.fastify.pg.query(
      `
        SELECT *
        FROM purchases
        WHERE (LOWER(product_name) LIKE '%' ||  LOWER($1)  || '%' OR $1 IS NULL)
        ORDER BY $2 $3
        LIMIT $4 OFFSET $5;
`,
      [product_name, pageSize, offset]
    );
    const products = result.rows;

    // Fetch total count of products
    const totalCountResult = await this.fastify.pg.query(
      `
        SELECT COUNT(*) FROM purchases
        WHERE (LOWER(product_name) LIKE '%' || LOWER($1) || '%' OR $1 IS NULL)
      `,
      [product_name]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { products, totalCount };
  }

  /*
  id
  product_name
  category
  default_cog
  default_ppu
  papers
  initial_qty
  reorder_level
  current_qty
  stock_status
  description
  */
  async addPurchases(items: {
    items: {
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
    }[];
  }) {
  //   let newProduct = {
  //     product_name,
  //     category,
  //     default_cog,
  //     default_ppu,
  //     papers,
  //     initial_qty,
  //     reorder_level,
  //     current_qty,
  //     stock_status,
  //     description,
  //   };
  //   let denulled: { [key: string]: any } = {};
  //   for (const [fieldName, fieldValue] of Object.entries(newProduct)) {
  //     if (fieldValue) denulled[fieldName] = fieldValue;
  //   }
  //   let query = `
  //   INSERT INTO product (${Object.keys(denulled).join(", ")})
  //   VALUES (
  //     ${Object.entries(denulled)
  //       .map((_, idx) => `$${idx + 1}`)
  //       .join(", ")}
  //   )
  //   RETURNING *
  // `;
  //   console.log(query);
  //   await this.fastify.pg.query(query, Object.values(denulled));
  //   //return { suppliers, totalCount };
  }
}
