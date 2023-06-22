import express from "express";
import cors from "cors";
import register from "./controller/auth/register.js";
import login from "./controller/auth/login.js";
import view from "./controller/user/view.js";
import listAll from "./controller/user/listAll.js";
import { check } from "express-validator";
import validatorResponse from "./middleware/validatorResponse.js";
import isAuthenticated from "./middleware/isAuthenticated.js";
import logout from "./controller/auth/logout.js";
import isAdmin from "./middleware/isAdmin.js";
import downloadUserInformation from "./controller/user/downloadUserInfo.js";


const PORT = 8080;

const app = express();
app.use(express.json());
app.use(cors())
    // app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin", "*")
    //     next()
    // })

// public routes
app.get("/", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// app.get("/api/users", (req, res) => {
//     res.status(200).json({ data: ["zahin", "asrar", "aiman"] })
// })
app.get("/public", (req, res) =>
    res.status(200).json({ message: "Public route" })
);

app.post(
    "/api/register",
    check("email").notEmpty().bail().isEmail().bail(),
    check("username").notEmpty().bail().isLength({ min: 4 }).bail(),
    check("password").notEmpty().bail().isLength({ min: 8 }).bail(),
    validatorResponse,
    register
);

app.post(
    "/api/login",
    check("identifier").notEmpty().bail(),
    check("password").notEmpty().bail().isLength({ min: 4 }).bail(),
    validatorResponse,
    login
);



// private routes
app.get("/private", isAuthenticated, (req, res) =>
    res.status(200).json({ message: "Private route", user: req.user })
);

app.get("/admin", isAuthenticated, isAdmin, (req, res) =>
    res.status(200).json({ message: "Admin route", user: req.user })
);

app.get("/api/users", isAuthenticated, listAll);

app.get("/api/users/:username", isAuthenticated, view);

app.get('/api/logout', isAuthenticated, logout)

app.get("/api/users/download/:id", isAuthenticated, downloadUserInformation);

app.listen(PORT, () => {
    console.log("Server run on port 8080");
});