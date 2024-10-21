import 'dotenv/config'
// 数据库配置
console.log(process.env.DB_PORT, Number(process.env.DB_PORT))
export const config = {
  // 数据库主机
  HOST: process.env.DB_HOST || "localhsot",
  // 数据库端口
  PORT: Number(process.env.DB_PORT) || 5432,
  // 数据库用户名
  USER: process.env.DB_USER || "root",
  // 数据库密码
  PASSWORD: process.env.DB_PASSWORD || "Gauss@hello",
  // 数据库名
  DB: process.env.DB_NAME || "testdb",
  // 数据库连接池配置
  pool: {
    // 最大连接数
    max: 5,
    // 最小连接数
    min: 0,
    // 获取连接的超时时间
    acquire: 30000,
    // 连接空闲的超时时间
    idle: 10000
  }
};

// 数据库方言
export const dialect = "postgres";