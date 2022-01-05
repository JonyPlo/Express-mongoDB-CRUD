import express from "express";
import { create } from "express-handlebars";
import indexRoutes from "./routes/index.routes";
import path from "path";
import morgan from 'morgan'

const app = express();

//Ubicacion absoluta de la carpeta views
app.set("views", path.join(__dirname, "views"));

const exphbs = create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
});

app.engine(".hbs", exphbs.engine); // ".engine" es para decirle que motor de plantilla voy a usar
app.set("view engine", ".hbs");

//Midlewares
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
// app.use(express.json())

//Routes
app.use(indexRoutes);

//Static files
app.use(express.static(path.join(__dirname, "public")))

export default app;