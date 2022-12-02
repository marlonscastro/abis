import { Request, Response, NextFunction } from "express";

const returnMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log('middleware 2')
    return next()
}

export default returnMiddleware