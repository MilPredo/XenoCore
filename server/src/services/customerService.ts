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
        FROM customer
        WHERE (LOWER(first_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
        AND (LOWER(middle_name) LIKE '%' || $2 || '%' OR $2 IS NULL)
        AND (LOWER(last_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
        ORDER BY id DESC
        LIMIT $4 OFFSET $5;
`,
      [first_name, middle_name, last_name, pageSize, offset]
    );
    const customers = result.rows;

    // Fetch total count of customers
    const totalCountResult = await this.fastify.pg.query(
      `
        SELECT COUNT(*) FROM customer
        WHERE (LOWER(first_name) LIKE '%' || $1 || '%' OR $1 IS NULL)
        AND (LOWER(middle_name) LIKE '%' || $2 || '%' OR $2 IS NULL)
        AND (LOWER(last_name) LIKE '%' || $3 || '%' OR $3 IS NULL)
      `,
      [first_name, middle_name, last_name]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { customers, totalCount };
  }

  async addCustomer(
    first_name: string,
    middle_name: string,
    last_name: string,
    // address: string,
    contact_number: string,
    // email: string,
    notes: string | undefined
  ) {
    let newCustomer = {
      first_name,
      middle_name,
      last_name,
      // address,
      contact_number,
      // email,
      notes,
    };
    let denulled: { [key: string]: any } = {};
    for (const [fieldName, fieldValue] of Object.entries(newCustomer)) {
      if (fieldValue) denulled[fieldName] = fieldValue;
    }
    let query = `
    INSERT INTO customer (${Object.keys(denulled).join(", ")})
    VALUES (
      ${Object.entries(denulled)
        .map((_, idx) => `$${idx + 1}`)
        .join(", ")}
    )
    RETURNING *
  `;
    console.log(query);
    await this.fastify.pg.query(query, Object.values(denulled));
    //return { customers, totalCount };
  }
}
