import { Application } from "express";
import tutorialRoutes from "./tutorial.routes";
import homeRoutes from "./home.routes";

// 定义路由类
export default class Routes {
  constructor(app: Application) {
    // 使用homeRoutes路由
    app.use("/api", homeRoutes);
    // 使用tutorialRoutes路由
    app.use("/api/tutorials", tutorialRoutes);
  }
}
