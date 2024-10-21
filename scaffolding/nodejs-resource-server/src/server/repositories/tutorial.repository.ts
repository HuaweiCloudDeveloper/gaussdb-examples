import { Op } from "sequelize";
import Tutorial from "../models/tutorial.model";

// 定义ITutorialRepository接口
interface ITutorialRepository {
  save(tutorial: Tutorial): Promise<Tutorial>; // 保存教程
  retrieveAll(searchParams: {title: string, published: boolean}): Promise<Tutorial[]>; // 检索所有教程
  retrieveById(tutorialId: number): Promise<Tutorial | null>; // 根据ID检索单个教程
  update(tutorial: Tutorial): Promise<number>; // 更新教程
  delete(tutorialId: number): Promise<number>; // 删除教程
  deleteAll(): Promise<number>; // 删除所有教程
}

// 定义搜索条件接口
interface SearchCondition {
  [key: string]: any;
}

// 实现ITutorialRepository接口的TutorialRepository类
class TutorialRepository implements ITutorialRepository {
  // 保存教程
  async save(tutorial: Tutorial): Promise<Tutorial> {
    try {
      return await Tutorial.create({
        title: tutorial.title,
        description: tutorial.description,
        published: tutorial.published
      });
    } catch (err) {
      console.log(err);
      throw new Error("Failed to create Tutorial!");
    }
  }

  // 检索所有教程
  async retrieveAll(searchParams: {title?: string, published?: boolean}): Promise<Tutorial[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.published) condition.published = true;

      if (searchParams?.title)
        condition.title = { [Op.iLike]: `%${searchParams.title}%` };

      return await Tutorial.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Tutorials!");
    }
  }

  // 根据ID检索单个教程
  async retrieveById(tutorialId: number): Promise<Tutorial | null> {
    try {
      return await Tutorial.findByPk(tutorialId);
    } catch (error) {
      throw new Error("Failed to retrieve Tutorials!");
    }
  }

  // 更新教程
  async update(tutorial: Tutorial): Promise<number> {
    const { id, title, description, published } = tutorial;

    try {
      const affectedRows = await Tutorial.update(
        { title, description, published },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Tutorial!");
    }
  }

  // 删除教程
  async delete(tutorialId: number): Promise<number> {
    try {
      const affectedRows = await Tutorial.destroy({ where: { id: tutorialId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Tutorial!");
    }
  }

  // 删除所有教程
  async deleteAll(): Promise<number> {
    try {
      return Tutorial.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Tutorials!");
    }
  }
}

// 导出TutorialRepository实例
export default new TutorialRepository();
