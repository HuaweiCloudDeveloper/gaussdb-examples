# 使用官方 Node.js 镜像作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

USER root 
# 安装 pm2 
RUN npm install pm2 -g --verbose --unsafe-perm --registry=https://repo.huaweicloud.com/repository/npm/
# 安装项目依赖
RUN npm install --verbose --unsafe-perm --registry=https://repo.huaweicloud.com/repository/npm/

# 复制项目文件
COPY . .

# 暴露应用程序的端口
EXPOSE 3000

# 启动应用程序
CMD ["pm2-runtime", "npm", "--", "start"]


