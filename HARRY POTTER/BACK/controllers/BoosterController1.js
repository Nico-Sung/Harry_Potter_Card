import prisma from "../config/prisma.js";

class BoosterController {
    async openBooster(req, res) {
        const userId = req.user.id;

        try {
            const user = await prisma.user.findUnique({
                //cherche l'utilisateur avec l'id
                where: { id: userId },
            });

            if (!user) {
                // si non trouvé retourne une erreur
                return res.status(404).json({ error: "user pas trouvé" });
            }

            const now = new Date(); // date actuelle
            if (user.nextBoosterTime && new Date(user.nextBoosterTime) > now) {
                // si la date actuelle est plus petite que la date de prochain booster alors retourne une erreur
                return res.status(403).json({
                    error: "Tous les 24heures vous pouvez ouvrir un booster",
                });
            }

            const nextBoosterTime = new Date(
                now.getTime() + 24 * 60 * 60 * 1000 // ajoute 24h en millisecondes
            );
            await prisma.user.update({
                // met à jour la date de prochain booster
                where: { id: userId },
                data: { nextBoosterTime: nextBoosterTime.toISOString() }, // convertit la date en string
            });

            const response = await fetch(
                // va chercher les personnages de l'api
                "https://hp-api.lainocs.fr/characters"
            );
            if (!response.ok) {
                // si non trouvé retourne une erreur
                throw new Error("pas d'api");
            }
            const characters = await response.json();

            const randomCharacters = []; // on crée tableau vide randomCharacters
            for (let i = 0; i < 5; i++) {
                // prend 5 personnages aléatoires
                const randomIndex = Math.floor(
                    Math.random() * characters.length
                );
                randomCharacters.push(characters[randomIndex]); // ajoute les personnages aléatoires dans le tableau randomCharacters
            }

            const createdCards = []; // on crée tableau vide createdCards
            for (const character of randomCharacters) {
                // pour chaque personnage aléatoire
                const newCard = await prisma.card.create({
                    // crée une carte qui contient le nom, l'image et la maison du personnage
                    data: {
                        name: character.name,
                        imageUrl: character.image,
                        house: character.house,
                    },
                });
                createdCards.push(newCard); // ajoute la carte dans le tableau createdCards
            }

            const inventoryCards = []; // on crée tableau vide inventoryCards
            for (const card of createdCards) {
                // pour chaque carte créée
                const inventoryCard = await prisma.inventoryCards.create({
                    // crée une carte dans l'inventaire de l'utilisateur avec l'id de la carte et l'id de l'utilisateur avec une quantité de 1
                    data: {
                        userId: userId,
                        cardId: card.id,
                        quantity: 1,
                    },
                });
                inventoryCards.push(inventoryCard); //rajoute la carte dans le tableau inventoryCards
            }
            return res.status(200).json({ cards: createdCards }); // retourne les cartes créées
        } catch (error) {
            return res.status(500).json({ error: error.message }); // sinon erreur
        }
    }

    async getTimeUntilNextBooster(req, res) {
        const userId = req.user.id;

        try {
            const user = await prisma.user.findUnique({
                // cherche l'utilisateur avec l'id
                where: { id: userId },
            });

            if (!user) {
                // si non trouvé retourne une erreur
                return res.status(404).json({ error: "user pas trouvé" });
            }

            const now = new Date(); // date actuelle
            if (user.nextBoosterTime && new Date(user.nextBoosterTime) > now) {
                // si la date actuelle est plus petite que la date de prochain booster alors retourne la différence
                const diff = new Date(user.nextBoosterTime) - now;
                return res.status(200).json({ timeUntilNextBooster: diff });
            }

            return res.status(200).json({ timeUntilNextBooster: 0 }); // sinon retourne 0
        } catch (error) {
            return res.status(500).json({ error: error.message }); // sinon erreur
        }
    }
}

export default new BoosterController();
