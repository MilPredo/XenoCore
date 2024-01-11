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
    const totalCog = result.rows[0]??0;
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
    const totalCog = result.rows[0]??0;
    return totalCog;
  }
}
