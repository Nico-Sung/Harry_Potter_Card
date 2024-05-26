// const express = require("express");
import express from "express";
// const UsersController = require("../controllers/UsersController");
import UsersController from "../controllers/UsersController.js";
import BoosterController from "../controllers/BoosterController1.js";
import AuthentificationController from "../controllers/AuthentificationController.js";
import AuthentificationMiddleWare from "../middlewares/AuthentificationMiddleWare.js";
import InventoryController from "../controllers/InventoryController.js";

const router = express.Router();

router.get(
    "/inventory",
    AuthentificationMiddleWare.authentification,
    InventoryController.getUserInventory
); // récupère l'inventaire de l'utilisateur

router.get(
    "/booster/:id",
    AuthentificationMiddleWare.authentification,
    BoosterController.getTimeUntilNextBooster
); // récupère le temps restant avant le prochain booster
router.get(
    "/booster",
    AuthentificationMiddleWare.authentification,
    BoosterController.openBooster
); // ouvre un booster via le bearer token grace au middleware d'authentification

router.get("/users", UsersController.index); // retourne tous les utilisateurs
router.post("/users", UsersController.store); // créer un utilisateur
router.put("/users/:id", UsersController.update); // mettre à jour un utilisateur
router.delete("/users/:id", UsersController.destroy); // supprimer un utilisateur
router.get("/users/:id", UsersController.show); // retourne un utilisateur avec l'id
router.get(
    "/getMyProfile",
    AuthentificationMiddleWare.authentification,
    UsersController.getMyProfile // retourne l'utilisateur qui est connecté
);
router.post("/login", AuthentificationController.login); // connecte un utilisateur

let lastHouseVisited = "Gryffindor"; // on definit la maison par défaut
router.get("/", (req, res) => {
    res.json({ message: lastHouseVisited });
});
router.post("/currentHouse", (req, res) => {
    console.log(req.body);
    lastHouseVisited = req.body.house; // on change la maison visitée
    res.json({ message: lastHouseVisited }); // on retourne la derniere maison visitée
});
router.get("/currentHouse", (req, res) => {
    res.json({ house: lastHouseVisited });
});

// module.exports = router;
export default router;
