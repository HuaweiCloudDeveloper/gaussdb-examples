// 导入express框架和Application类型
import express, { Application } from "express";
// 导入cors中间件和CorsOptions类型
import cors, { CorsOptions } from "cors";
// 导入路由配置
import Routes from "./routes";
// 导入数据库配置
import Database from "./db";

// 服务器类
export default class Server {
  // 构造函数，初始化应用配置和数据库同步
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Routes(app);
  }

  // 配置应用
  private config(app: Application): void {
    // 设置允许跨域的源
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081"
    };

    // 使用cors中间件
    // app.use(cors(corsOptions));
    app.use(cors());
    // 使用json解析器
    app.use(express.json());
    // 使用urlencoded解析器
    app.use(express.urlencoded({ extended: true }));
    
  }

  // 同步数据库
  private syncDatabase(): void {
    // 创建数据库实例
    const db = new Database();
    // 同步数据库
    db.sequelize?.sync();
  }
}
