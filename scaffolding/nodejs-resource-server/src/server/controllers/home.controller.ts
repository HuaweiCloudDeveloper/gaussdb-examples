import { Request, Response } from "express";

/**
 * 处理欢迎请求的函数
 * @param {Request} req - 传入的请求对象
 * @param {Response} res - 响应对象
 * @returns {Response} - 包含欢迎消息的 JSON 响应
 */
export function welcome(req: Request, res: Response): Response {
  return res.json({ message: "Welcome to bezkoder application." });
}
