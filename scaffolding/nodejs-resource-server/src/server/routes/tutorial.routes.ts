import { Router } from "express";
import TutorialController from "../controllers/tutorial.controller";

// 定义TutorialRoutes类
class TutorialRoutes {
  // 初始化路由器和控制器
  router = Router();
  controller = new TutorialController();

  constructor() {
    this.intializeRoutes();
  }

  // 初始化路由
  intializeRoutes() {
    // 创建新的教程
    this.router.post("/", this.controller.create);

    // 检索所有教程
    this.router.get("/", this.controller.findAll);

    // 检索所有已发表的教程
    this.router.get("/published", this.controller.findAllPublished);

    // 根据id检索单个教程
    this.router.get("/:id", this.controller.findOne);

    // 更新id为指定的教程
    this.router.put("/:id", this.controller.update);

    // 删除id为指定的教程
    this.router.delete("/:id", this.controller.delete);

    // 删除所有教程
    this.router.delete("/", this.controller.deleteAll);
  }
}

// 导出路由器
export default new TutorialRoutes().router;
