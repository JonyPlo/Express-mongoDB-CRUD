import { Router } from "express";
import Task from "../models/Task";

const router = Router();

router.get("/", async (req, res) => {
  const tasks = await Task.find().lean(); //Con la funcion lean() le estoy diciendo a mongo que me devuelva los objetos en un formato tipico para podes recoorerlos en cualquier parte sin ningun problema, en general le decimos que ya no nos devuelva objetos de mongoDB si no objetos de javascript
  res.render("index", { tasks: tasks });
});

router.post("/task/add", async (req, res) => {
  try {
    const task = Task(req.body);
    await task.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

router
  .route("/edit/:id")
  .get(async (req, res) => {
    const task = await Task.findById(req.params.id).lean();
    res.render("edit", { task: task });
  })
  .post(async (req, res) => {
    try {
      await Task.findByIdAndUpdate(req.params.id, req.body);
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  });

export default router;
