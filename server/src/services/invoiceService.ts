import { FastifyInstance } from "fastify";

export class InvoiceService {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  /*
      customer_id
      product_id: string;
      user_id: number;
      quantity: string;
      ppu: number;
      transaction_date: Date
      payment_method:
      remittance_status:
      user_type:
  */
  async getRequests(
    page: number = 1,
    pageSize: number = 16,
    request_id: number | null,
    order_by: "id" | "request_id" | "transaction_date" | "delivery_date" = "transaction_date",
    order_direction: "asc" | "desc" | "ASC" | "DESC" = "DESC"
  ) {
    const validColumns = ["id", "transaction_date", "delivery_date"];

    order_by = validColumns.includes(order_by) ? order_by : "id";

    const validDirections = ["asc", "desc", "ASC", "DESC"];
    order_direction = validDirections.includes(order_direction) ? order_direction : "DESC";
    const offset = (page - 1) * pageSize;

    const query = `

    SELECT requests.*, 
    users.first_name AS user_first_name, 
    users.middle_name AS user_middle_name, 
    users.last_name AS user_last_name
    FROM requests
    LEFT join users on requests.user_id = users.id
    AND (requests.id = $1 OR $1 IS NULL)
    ORDER BY id ${order_direction} LIMIT $2 OFFSET $3; `;
    console.log(query);
    const result = await this.fastify.pg.query(query, [request_id, pageSize, offset]);
    const requests = result.rows;

    // Fetch total count of sales
    const totalCountResult = await this.fastify.pg.query(
      `
      SELECT COUNT(*)
      FROM (
        SELECT requests.*, 
        users.first_name AS user_first_name, 
        users.middle_name AS user_middle_name, 
        users.last_name AS user_last_name
        FROM requests
        LEFT join users on requests.user_id = users.id
        AND (requests.id = $1 OR $1 IS NULL)
      ) AS subquery;
      `,
      [request_id]
    );
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    return { requests, totalCount };
  }

  /*
    id
    request_id
    product_id
    quantity
    cog
    ppu
  */
  async getRequestItems(id: number) {
    const query = `
    SELECT *
    FROM requests_items
    WHERE request_id = $1`;
    console.log(query);
    const result = await this.fastify.pg.query(query, [id]);
    const items = result.rows;
    return { items };
  }

  /*
ORDER FORM
Client Name: Garrod
Delivery Address: cainta
Delivery Date: jan  29,2023
Delivery time: 10am
Contact Number: 
Medicines & Qty: 50 box  of  30  1500 tab 
price  45 per tab
Amount: 67,500
Terms: pdc
courier: me


tag to Category c &d
tag to house acct

thank you

  id
  request_id
  product_id
  quantity
  cog
  ppu
  */
  async addRequest(
    user_id: number,
    address: string,
    delivery_date: string,
    isInvoiced: boolean,
    discount_type: string,
    transaction_date: string,
    admin_id: number,
    items: {
      product_id: string;
      quantity: string;
      ppu: number;
      cog: number;
    }[]
  ) {
    let query1 = `INSERT INTO requests (
      user_id,
      address,
      delivery_date,
      "isInvoiced",
      discount_type,
      transaction_date,
      admin_id
  ) VALUES (
      $1, $2::text, $3, $4, $5, $6, $7
  ) RETURNING id;`;
    let query2 = `INSERT INTO requests_items (
      request_id,
      product_id,
      quantity,
      ppu,
      cog
  ) VALUES `;

    // Generate placeholders for items
    let placeholders = [];
    for (let i = 0; i < items.length; i++) {
      const baseIndex = i * 4 + 1; // Increment by 4 for each item
      placeholders.push(`($1, $${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4})`);
    }
    query2 += placeholders.join(",");

    // Commit the transaction
    let commitQuery = "COMMIT;";

    let inputs = items.map((row) => {
      /*
  customer_id, 
  product_id, 
  user_id, 
  quantity, 
  ppu, 
  transaction_date, 
  payment_method, 
  remittance_status, 
  user_type
  */
      let output: any = [row.product_id, row.quantity, row.ppu, row.cog];
      return output;
    });

    // Start a transaction
    await this.fastify.pg.query("BEGIN");

    try {
      console.log(query1)
      const result = await this.fastify.pg.query(query1, [
        user_id,
        address,
        delivery_date,
        isInvoiced,
        discount_type,
        transaction_date,
        admin_id,
      ]);
      const requestId = result.rows[0].id;
      console.log('done')
      
      console.log(query2)
      await this.fastify.pg.query(query2, [requestId, ...[].concat(...inputs)]);

      // Commit the transaction
      await this.fastify.pg.query(commitQuery);
    } catch (error) {
      // Rollback the transaction if an error occurs
      await this.fastify.pg.query("ROLLBACK");
      throw error;
    }
  }
}
