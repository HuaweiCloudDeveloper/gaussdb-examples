// 导入express框架和Server类
import express from "express";
import type { Request, Response } from 'express';
import ViteExpress from "vite-express";
import Server from "./index";
import path from 'path';

// 创建express应用实例
const app = express();


// 创建Server实例
const server: Server = new Server(app);
// 获取环境变量PORT，如果不存在则默认为8080
console.log('process.env.PORT', process.env.PORT)
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const HOST: string = process.env.HOST || '0.0.0.0';
const isProduction = process.env.NODE_ENV === 'production'; // 新增：判断是否为生产环境

// Serve static files from the client
app.use(express.static(path.join(__dirname, isProduction ? '../dist' : '../../dist'))); // 根据环境选择路径

// Example API route
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express!' });
});

// Fallback for all other routes to index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, isProduction ? '../dist/index.html' : '../../src/dist/index.html')); // 根据环境选择路径
});

// 监听指定端口和主机，启动服务器
const myServer = app
  .listen(PORT, HOST, function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    // 如果端口已被占用，则输出相应错误信息
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      // 否则输出错误信息
      console.log(err);
    }
  });

ViteExpress.bind(app, myServer, async () => {
  const { root, base } = await ViteExpress.getViteConfig();
  console.log(`Serving app from root ${root}`);
  console.log(`Server is listening at http://${HOST}:${PORT}${base}`);
});
