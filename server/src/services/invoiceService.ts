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
    order_by:
      | "id"
      | "request_id"
      | "transaction_date"
      | "delivery_date" = "transaction_date",
    order_direction: "asc" | "desc" | "ASC" | "DESC" = "DESC"
  ) {
    const validColumns = [
      "id",
      "transaction_date",
      "delivery_date",
    ];

    order_by = validColumns.includes(order_by) ? order_by : "id";

    const validDirections = ["asc", "desc", "ASC", "DESC"];
    order_direction = validDirections.includes(order_direction)
      ? order_direction
      : "DESC";
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
    const result = await this.fastify.pg.query(query, [
      request_id,
      pageSize,
      offset,
    ]);
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
      product_id: string;
      quantity: string;
      cog?: number;
      transaction_date?: Date
      delivery_date?: Date
      delivery_status?: string
      notes?: string;
      user_id: number;
  */
  async addSales(
    items: {
      customer_id: string;
      product_id: string;
      quantity: string;
      ppu: number;
      cog: number;
      transaction_date?: Date;
      payment_method: number;
      remittance_status: number;
      user_id: number;
      user_type: string;
    }[]
  ) {
    // items.map((purchase_order) => {
    //   let output = [
    //     purchase_order.product_id,
    //     purchase_order.quantity,
    //     purchase_order.cog,
    //     purchase_order.transaction_date,
    //     purchase_order.delivery_date,
    //     purchase_order.delivery_status,
    //     purchase_order.notes,
    //     purchase_order.user_id,
    //   ].join();
    //   return output;
    // });

    let query = `
      INSERT INTO sales (
        customer_id, product_id, user_id, quantity, ppu, cog, transaction_date, payment_method, remittance_status, user_type)
        VALUES ${items
          .map((_, idx) => {
            let string_row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .map((_, idx2) => {
                return `$${idx * 10 + (idx2 + 1)}`;
              })
              .join();

            string_row = `(${string_row})`;
            return string_row;
          })
          .join()}
    `;
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
      let output: any = [
        row.customer_id,
        row.product_id,
        row.user_id,
        row.quantity,
        row.ppu,
        row.cog,
        row.transaction_date,
        row.payment_method,
        row.remittance_status,
        row.user_type,
      ];
      return output;
    });
    console.log(query, [].concat(...inputs));

    await this.fastify.pg.query(query, [].concat(...inputs));
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
