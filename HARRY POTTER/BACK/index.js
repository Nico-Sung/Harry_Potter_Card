// const express = require("express");
import express from "express";
import router from "./routes/start.js";
import cors from "cors";
import bodyParser from "body-parser";
import ip from "ip";

const app = express();
const ipAdress = ip.address();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/", router);

app.listen(port, () => {
    console.log(`Server run : http://` + ip.address() + `:3000`);
});
