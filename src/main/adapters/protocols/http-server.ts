import { Controller } from "@/data/controllers/controller";
import { Routes } from "@/main/routes/routes";
import { RequestHandler } from "express";

export type Adapter = (controller: Controller) => RequestHandler

export interface httpServer {
    create: Adapter;
    addRouters(routes: Routes): void;
    addUseRouter(path: string, middleware?: any): void;
    init(port: string | number): void;
}
