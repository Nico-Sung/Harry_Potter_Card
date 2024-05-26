import prisma from "../config/prisma.js";
import { hashPassword } from "../utils/bcrypt.js";

class UsersController {
    getMyProfile(req, res) {
        // retourne l'utilisateur qui est connecté
        const user = req.user;
        return res.status(200).send(user);
    }

    async index(req, res) {
        // retourne tous les utilisateurs qui se sont inscrits
        const users = await prisma.user.findMany();
        return res.status(200).send(users);
    }

    async store(req, res) {
        // créer un utilisateur
        try {
            const body = req.body;
            const user = await prisma.user.create({
                // crée un utilisateur avec le nom, l'email et le mot de passe
                data: {
                    name: body.name,
                    email: body.email,
                    password: await hashPassword(body.password), // hash le mot de passe via bcrypt
                },
            });
            return res.status(201).send(user);
        } catch (error) {
            // si une erreur est survenue alors retourne une erreur 400 par exemple quand le mail est déjà utilisé
            return res
                .status(400)
                .send(
                    "Une erreur est survenue lors de la création de l'utilisateur"
                );
        }
    }

    async show(req, res) {
        // retourne un utilisateur avec l'id
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId), // convertit l'id en integer
            },
        });
        if (!user) {
            // si different alors retourne une erreur 404
            return res.status(404).send("Utilisateur non trouvé");
        }
        return res.status(200).send(user);
    }

    async update(req, res) {
        try {
            const userId = req.params.id;
            let body = req.body;

            if (body.password) {
                // si le mot de passe est présent alors hash le mot de passe
                body.password = await hashPassword(body.password);
            }

            const user = await prisma.user.update({
                // met à jour l'utilisateur
                where: {
                    id: parseInt(userId), // convertit l'id en integer
                },
                data: body,
            });
            if (user === null) {
                // si null alors retourne une erreur 404
                return res.status(404).send("Utilisateur non trouvé");
            }
            return res.status(200).send(user); // retourne l'utilisateur mis à jour
        } catch (error) {
            //retourne une erreur 500 par exemple quand le mail est déjà utilisé
            return res.status(500).send("Mail deja utilisé");
        }
    }

    async destroy(req, res) {
        // supprimer un utilisateur
        try {
            const userId = req.params.id;
            const user = await prisma.user.delete({
                where: {
                    id: parseInt(userId),
                },
            });
            return res.status(200).send("supprimed");
        } catch (error) {
            return res.status(404).send("Utilisateur non trouvé");
        }
    }
}

//module.exports = new UsersController();

export default new UsersController();
