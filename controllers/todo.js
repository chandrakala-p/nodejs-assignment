import Todo from "../models/Todo.js";
export const createTodo = async (req, res) => {
  try {
    const { title, createdAt } = req.body;
    const user_id = req.user.userid._id;
    if (!title) {
      return res.status(500).json({
        success: false,
        message: "todo is empty",
      });
    }

    const todo = new Todo({
      title: title,
      user_id: user_id,
      createdAt: createdAt,
    });
    const response = await todo.save();
    if (response) {
      res.status(200).json({
        success: true,
        message: "todo created successfully",
        todo,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "cannot save todo in DB",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { todoid } = req.params;
    if (!todoid) {
      res.status(500).json({
        success: false,
        message: "can't find todo id",
      });
    }
    const deletedTodo = await Todo.findByIdAndDelete(todoid);
    if (!deletedTodo) {
      res.status(500).json({
        success: false,
        message: "todo deletion failed",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo deleted successfully",
        deletedTodo,
      });
    }
  } catch (error) {
    throw new Error(error.message || "Error");
  }
};
export const editTodo = async (req, res) => {
  try {
    const { todoid } = req.params;
    const { title } = req.body;
    if (!todoid) {
      res.status(500).json({
        success: false,
        message: "can't find todoid",
      });
    }
    // TODO: check if todo is present in DB
    const todo = await Todo.findByIdAndUpdate(todoid, {
      title: title,
    });
    if (!todo) {
      res.status(500).json({
        success: false,
        message: "todo updation failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "todo updated successfully",
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getTodos = async (req, res) => {
  try {
    const user_id = req.user.userid._id;
    const username = req.user.name;
    const todos = await Todo.find({ user_id });
    if (!todos) {
      res.status(500).json({
        success: false,
        message: "todos fetching failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "todos fetching successfully",
      todos,
      username,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
export const getTodo = async (req, res) => {
  try {
    const { todoid } = req.params;
    if (!todoid) {
      res.status(200).json({
        success: false,
        message: "can't find todoid",
      });
    }
    const todo = await Todo.findById(todoid);
    if (!todo) {
      res.status(200).json({
        success: false,
        message: "todo fetching failed",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo fetching successfully",
        todo,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
