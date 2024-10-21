import { Model, Table, Column, DataType } from "sequelize-typescript";

// 定义tutorials表
@Table({
  tableName: "tutorials",
})
export default class Tutorial extends Model {
  // 定义id列
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  // 定义title列
  @Column({
    type: DataType.STRING(255),
    field: "title"
  })
  title?: string;

  // 定义description列
  @Column({
    type: DataType.STRING(255),
    field: "description"
  })
  description?: string;

  // 定义published列
  @Column({
    type: DataType.BOOLEAN,
    field: "published"
  })
  published?: boolean;
}
