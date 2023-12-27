import { FastifyInstance } from "fastify";

export class InventoryService {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getAllInventory(
    page: number = 1,
    pageSize: number = 16,
    product_name: string,
    id: number | undefined | string,
    order_direction: "asc" | "desc" | "ASC" | "DESC" = "DESC"
  ) {
    const validDirections = ["asc", "desc", "ASC", "DESC"];
    order_direction = validDirections.includes(order_direction) ? order_direction : "DESC";
    const offset = (page - 1) * pageSize;
    if (id === "") id = undefined;
    const query = `
      SELECT
          product.id,
          product.product_name,
          product.default_cog,
          product.default_ppu,
          product.category,
          product.papers,
          product.reorder_level,
          COALESCE(SUM(purchases.quantity), 0) AS total_purchase_quantity,
          COALESCE(SUM(sales.sale_quantity), 0) AS total_sale_quantity,
          COALESCE(SUM(purchases.quantity), 0) - COALESCE(SUM(sales.sale_quantity), 0) AS inventory_balance
      FROM
          product
      LEFT JOIN (
          SELECT
              product_id,
              SUM(quantity) AS quantity
          FROM
              purchases
          GROUP BY
              product_id
      ) AS purchases ON product.id = purchases.product_id
      LEFT JOIN (
          SELECT
              product_id,
              SUM(quantity) AS sale_quantity
          FROM
              sales
          GROUP BY
              product_id
      ) AS sales ON product.id = sales.product_id
      WHERE
          (LOWER(product.product_name) LIKE '%' || LOWER($1) || '%' OR $1 IS NULL)
          AND (product.id = $2 OR $2 IS NULL)
      GROUP BY
          product.id, product.product_name
      ORDER BY
          product.id ${order_direction}
      LIMIT
          $3 OFFSET $4;

`;
    console.log(query);
    const result = await this.fastify.pg.query(query, [product_name, id, pageSize, offset]);
    const inventory = result.rows;

    console.log("id", id);
    // Fetch total count of products
    const totalCountResult = await this.fastify.pg.query(
      `
        SELECT COUNT(*) FROM product
        WHERE (LOWER(product_name) LIKE '%' || LOWER($1) || '%' OR $1 IS NULL)
        AND (id = $2 OR $2 IS NULL)
      `,
      [product_name, id]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { inventory, totalCount };
  }
}
