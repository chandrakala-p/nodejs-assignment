import express from "express";
const router = express.Router();

import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  editTodo
} from "../controllers/todo.js";

import auth from "../middlewares/auth.js";
router.use(auth);

router.post("/createtodo", createTodo);
router.delete("/deletetodo/:todoid", deleteTodo);
router.get("/gettodo/:todoid", getTodo);
router.get("/gettodos", getTodos);
router.put("/editTodo/:todoid", editTodo);

export default router;
