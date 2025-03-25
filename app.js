import express from 'express'
import taskRoutes from './routes/taskRoutes.js'
import path from "path"

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

app.use(loggingMiddleware);

app.use('/', taskRoutes);

app.use((req, res) => {
    res.status(400).send('Page Not Found');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});