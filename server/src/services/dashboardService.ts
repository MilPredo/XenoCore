//SELECT SUM(cog) AS total_cog FROM purchases;

import { FastifyInstance } from "fastify";

export class DashboardService {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async getTotalCog(start_date?: Date, end_date?: Date) {
    let query = `SELECT SUM(cog) AS total_cog FROM purchases`;
    let input = [];
    if (start_date) {
      input.push(start_date);
      query += ` WHERE transaction_date >= ${input.length}`;

      if (end_date) {
        input.push(end_date);
        query += ` AND transaction_date <= ${input.length}`;
      }
    } else {
      if (end_date) {
        input.push(end_date);
        query += ` WHERE transaction_date <= ${input.length}`;
      }
    }
    const result = await this.fastify.pg.query(query, input);
    const totalCog = result.rows[0] ?? 0;
    return totalCog;
  }

  async getTotalPpu(start_date?: Date, end_date?: Date) {
    let query = `SELECT SUM(ppu) AS total_ppu FROM sales`;
    let input = [];
    if (start_date) {
      input.push(start_date);
      query += ` WHERE transaction_date >= ${input.length}`;

      if (end_date) {
        input.push(end_date);
        query += ` AND transaction_date <= ${input.length}`;
      }
    } else {
      if (end_date) {
        input.push(end_date);
        query += ` WHERE transaction_date <= ${input.length}`;
      }
    }
    const result = await this.fastify.pg.query(query, input);
    const totalCog = result.rows[0] ?? 0;
    return totalCog;
  }

  async getTopFiveProductSales() {
    let query = `
    SELECT
        product.id,
        product.product_name,
        product.category,
        COALESCE(SUM(sales.sale_quantity), 0) AS total_sale_quantity
    FROM
        product
    LEFT JOIN (
        SELECT
            product_id,
            SUM(quantity) AS sale_quantity
        FROM
            sales
    WHERE
        transaction_date >= DATE_TRUNC('MONTH', CURRENT_DATE) --DATE_TRUNC('MONTH', DATE '2023-12-01')
        GROUP BY
            product_id
    ) AS sales ON product.id = sales.product_id
    GROUP BY
        product.id, product.product_name, product.category
    ORDER BY
        total_sale_quantity DESC
    LIMIT
        5;
`;
    const result = await this.fastify.pg.query(query);
    const topFive = result.rows;
    return topFive;
  }
}
