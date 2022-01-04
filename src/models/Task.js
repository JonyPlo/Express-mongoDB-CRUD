import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false, //Esta propiedad sirve para evitar que al crearse la task se agregue por defecto una propiedad llamada "__v: 0" o similar
  }
);

export default model("Task", taskSchema);
