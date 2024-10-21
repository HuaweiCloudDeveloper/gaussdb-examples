# 使用官方 Node.js 镜像作为基础镜像
FROM node:20-alpine AS build

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

USER root 
# 安装 pm2 
RUN npm install pm2 -g  --verbose --unsafe-perm --registry=https://repo.huaweicloud.com/repository/npm/
 
# 安装项目依赖
RUN npm install --verbose --unsafe-perm --registry=https://repo.huaweicloud.com/repository/npm/

# 复制项目文件
COPY . .

# 构建应用程序
RUN npm run build

# 使用 Nginx 作为生产服务器
FROM nginx:alpine

# 复制构建后的文件到 Nginx 目录
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# 复制 Nginx 配置模板
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 Nginx 端口
EXPOSE 80

# 启动 Nginx，并使用 envsubst 替换环境变量
CMD nginx -g 'daemon off;'

# docker run -d -p 80:80 -e API_URL=http://192.168.10.22:8080 your_image_name

