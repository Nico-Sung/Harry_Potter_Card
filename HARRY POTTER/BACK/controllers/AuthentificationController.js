import prisma from "../config/prisma.js";
import { comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

class AuthentificationController {
    async login(req, res) {
        // se connecter
        try {
            const body = req.body;

            const user = await prisma.user.findFirst({
                // cherche l'utilisateur avec l'email
                where: {
                    email: body.email,
                },
            });
            if (user === null) {
                // si null alors retourne une erreur 404
                return res.status(404).send("User not found");
            }

            const isSamePassword = await comparePassword(
                // compare le mot de passe de la requête avec le mot de passe de l'utilisateur
                body.password,
                user.password
            );

            if (!isSamePassword) {
                // si différent alors retourne une erreur 401
                return res.status(401).send("Invalid password");
            }

            const token = generateToken(user); // génère un token avec l'utilisateur

            return res.status(200).send({ user, token }); // retourne l'utilisateur et le token
        } catch (e) {
            // si une erreur est survenue alors retourne une erreur 500
            res.status(500).send(e.message);
        }
    }
}

export default new AuthentificationController();
