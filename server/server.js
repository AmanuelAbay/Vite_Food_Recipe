import express from "express";
import { urlencoded } from "body-parser";
import { signuphandler } from "./handlers/signup.js";
import { loginhandler } from "./handlers/login.js";
import { upload } from "./handlers/upload.js";
import cors from "cors";
require("dotenv").config();
const app = express();
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json({ limit: "50MB" }));
app.use(json());

const PORT = process.env.NODE_SERVER_PORT || 3000;

app.post("/signup", signuphandler);
app.post("/signin", loginhandler);
app.post("/upload", upload);

app.listen(PORT, () => {
  console.log("Server Running at port " + PORT + "...");
});
