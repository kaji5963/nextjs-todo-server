import express from "express";
import { PrismaClient } from "@prisma/client";
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

const PORT = 8080;

// json形式でやる宣言（書かないとjsonを認識できない）
app.use(express.json());

// 異なるPORTからの接続も許容する
app.use(cors());

// prismaClientのインスタンス化
const prisma = new PrismaClient();

// GET：TODO取得API
app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();

  return res.json(allTodos);
});

// POST：TODO作成API
app.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;

    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });

    return res.json(createTodo);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// PUT：TODO編集API
app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { title, isCompleted } = req.body;

    const editTodo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        title,
        isCompleted,
      },
    });

    return res.json(editTodo);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// DELETE：TODO削除API
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deleteTodo = await prisma.todo.delete({
      where: {
        id,
      },
    });

    return res.json(deleteTodo);
  } catch (error) {
    return res.status(400).json(error);
  }
});

app.listen(PORT, () => console.log("server is running"));
