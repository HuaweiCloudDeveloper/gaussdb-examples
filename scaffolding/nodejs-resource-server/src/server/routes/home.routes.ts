// 导入express的Router和welcome控制器
import { Router } from "express";
import { welcome } from "../controllers/home.controller";

// 定义HomeRoutes类
class HomeRoutes {
  // 初始化路由器
  router = Router();

  // 构造函数，用于初始化路由
  constructor() {
    this.intializeRoutes();
  }

  // 初始化路由
  intializeRoutes() {
    // 定义首页路由
    this.router.get("/", welcome);
  }
}

// 导出路由器实例
export default new HomeRoutes().router;
