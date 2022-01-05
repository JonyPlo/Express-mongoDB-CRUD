import Task from "../models/Task";
const taskCtrl = {};

taskCtrl.getTask = async (req, res) => {
  const tasks = await Task.find().lean(); //Con la funcion lean() le estoy diciendo a mongo que me devuelva los objetos en un formato tipico para podes recoorerlos en cualquier parte sin ningun problema, en general le decimos que ya no nos devuelva objetos de mongoDB si no objetos de javascript
  res.render("index", { tasks: tasks });
};

taskCtrl.postTask = async (req, res) => {
  try {
    const task = Task(req.body);
    await task.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

taskCtrl.getEditTask = async (req, res) => {
  const task = await Task.findById(req.params.id).lean();
  res.render("edit", { task: task });
};

taskCtrl.postEditTask = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

taskCtrl.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

taskCtrl.getDoneTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.done = !task.done;
  await task.save();
  res.redirect("/");
};

export default taskCtrl;
