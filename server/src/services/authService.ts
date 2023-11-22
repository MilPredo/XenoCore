import {FastifyInstance } from "fastify";
/*
Service:
  Responsibility: Services contain the application's business logic. They encapsulate the functionality related to specific entities or features and are responsible for data manipulation, validation, and communication with the data storage layer (e.g., database).
  Concerns:
    Business logic: Implementing the core functionality of the application, including data manipulation and validation.
    Data access: Interacting with the database or other external data sources to retrieve or persist data.
    Encapsulation: Hiding the implementation details of the business logic from the controller, promoting separation of concerns.
*/
export class UserService {
  private fastify: FastifyInstance;
  
}