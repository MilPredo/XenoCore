import { FastifyInstance } from "fastify";

export class PurchaseService {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  /*
      product_id: string;
      quantity: string;
      cog?: number;
      transaction_date?: Date
      delivery_date?: Date
      delivery_status?: string
      notes?: string;
      user_id: number;
  */
  async getAllPurchases(
    page: number = 1,
    pageSize: number = 16,
    product_name: string,
    order_by:
      | "product_name"
      | "product_id"
      | "transaction_date"
      | "delivery_date" = "product_name",
    order_direction: "asc" | "desc" | "ASC" | "DESC" = "DESC"
  ) {
    const validColumns = [
      "product_name",
      "product_id",
      "transaction_date",
      "delivery_date",
    ];

    order_by = validColumns.includes(order_by) ? order_by : "product_id";

    const validDirections = ["asc", "desc", "ASC", "DESC"];
    order_direction = validDirections.includes(order_direction)
      ? order_direction
      : "DESC";
    const offset = (page - 1) * pageSize;

    /*

    */
    const result = await this.fastify.pg.query(
      `
      SELECT purchases.*, product.product_name, supplier.supplier_name
      FROM purchases
      LEFT JOIN product ON purchases.product_id = product.id
      LEFT JOIN supplier ON purchases.supplier_id = product.id
      WHERE LOWER(product.product_name) LIKE '%' || LOWER($1)  || '%' OR $1 IS NULL)
      ORDER BY $2 $3
      LIMIT $4 OFFSET $5;
      `,
      [product_name, order_by, order_direction, pageSize, offset]
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
      product_id: string;
      quantity: string;
      cog?: number;
      transaction_date?: Date
      delivery_date?: Date
      delivery_status?: string
      notes?: string;
      user_id: number;
  */
  async addPurchases(items: {
    items: {
      product_id: string;
      quantity: string;
      cog?: number;
      transaction_date?: Date;
      delivery_date?: Date;
      delivery_status?: string;
      notes?: string;
      user_id: number;
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
