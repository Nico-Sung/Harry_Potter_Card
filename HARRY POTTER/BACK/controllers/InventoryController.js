import prisma from "../config/prisma.js";

class InventoryController {
    async getUserInventory(req, res) {
        // va chercher les cartes de l'utilisateur avec le bearer token
        const userId = req.user.id;

        try {
            const inventory = await prisma.inventoryCards.findMany({
                where: { userId },
                include: { card: true },
            });

            return res.status(200).json({ inventory });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new InventoryController();
