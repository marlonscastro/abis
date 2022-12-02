import { Routes } from "@/main/routes/routes";
import { Adapter, httpServer } from "./protocols/http-server";

export class FastifyAdapter implements httpServer {
  create: Adapter;
  addRouters(routes: Routes): void {
    throw new Error("Method not implemented.");
  }
  addUseRouter(path: string, middleware?: any): void {
    throw new Error("Method not implemented.");
  }
  init(port: string | number): void {
    throw new Error("Method not implemented.");
  }
  
}