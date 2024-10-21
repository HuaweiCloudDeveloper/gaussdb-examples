import { Request, Response } from "express";
import Tutorial from "../models/tutorial.model";
import tutorialRepository from "../repositories/tutorial.repository";

// 导出TutorialController类
export default class TutorialController {
  // 创建教程
  async create(req: Request, res: Response) {
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const tutorial: Tutorial = req.body;
      if (!tutorial.published) tutorial.published = false;

      const savedTutorial = await tutorialRepository.save(tutorial);

      res.status(201).send(savedTutorial);
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials."
      });
    }
  }

  // 检索所有教程
  async findAll(req: Request, res: Response) {
    const title = typeof req.query.title === "string" ? req.query.title : "";

    try {
      const tutorials = await tutorialRepository.retrieveAll({ title });

      res.status(200).send(tutorials);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials."
      });
    }
  }

  // 根据ID检索单个教程
  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const tutorial = await tutorialRepository.retrieveById(id);

      if (tutorial) res.status(200).send(tutorial);
      else
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Tutorial with id=${id}.`
      });
    }
  }

  // 更新教程
  async update(req: Request, res: Response) {
    let tutorial: Tutorial = req.body;
    tutorial.id = parseInt(req.params.id);

    try {
      const num = await tutorialRepository.update(tutorial);

      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${tutorial.id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Tutorial with id=${tutorial.id}.`
      });
    }
  }

  // 删除教程
  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await tutorialRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Tutorial with id==${id}.`
      });
    }
  }

  // 删除所有教程
  async deleteAll(req: Request, res: Response) {
    try {
      const num = await tutorialRepository.deleteAll();

      res.send({ message: `${num} Tutorials were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all tutorials."
      });
    }
  }

  // 检索所有已发布的教程
  async findAllPublished(req: Request, res: Response) {
    try {
      const tutorials = await tutorialRepository.retrieveAll({ published: true });

      res.status(200).send(tutorials);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving tutorials."
      });
    }
  }
}
