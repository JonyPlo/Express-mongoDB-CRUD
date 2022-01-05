import { Router } from "express";
import taskCtrl from "../controllers/tasks.controller";

const {
  getTask,
  postTask,
  getEditTask,
  postEditTask,
  deleteTask,
  getDoneTask,
} = taskCtrl;

const router = Router();

router.route("/").get(getTask);

router.route("/task/add").post(postTask);

router.route("/task/:id/edit").get(getEditTask).post(postEditTask);

router.route("/task/:id/delete").get(deleteTask);

router.route("/task/:id/toggleDone").get(getDoneTask);

export default router;
