import jsonwebtoken from "jsonwebtoken";
import prisma from "../config/prisma.js";

class AuthentificationMiddleware {
    async authentification(req, res, next) {
        // vérifie si l'utilisateur est connecté
        const authHeader = req.headers.authorization; // récupère le header

        if (!authHeader)
            // si pas de header alors retourne une erreur
            return res.status(401).json({ error: "pas de token trouvé" });

        const token = authHeader.split(" ")[1]; // récupère le token

        jsonwebtoken.verify(
            // vérifie le token
            token,
            process.env.JWT_SECRET, // prend la clé secrète
            async (err, payload) => {
                if (err) {
                    // si une erreur est survenue alors retourne une erreur
                    return res.status(403).json({ error: "token invalide" });
                }

                const email = payload.email; // récupère l'email

                const user = await prisma.user.findUnique({
                    // cherche l'utilisateur avec l'email
                    where: { email },
                });

                if (!user) {
                    // si non trouvé alors retourne une erreur
                    return res
                        .status(403)
                        .json({ error: "utilisateur non trouvé" });
                }

                req.user = user; // stocke l'utilisateur dans la requête
                next(); // passe à la suite
            }
        );
    }
}

export default new AuthentificationMiddleware();
