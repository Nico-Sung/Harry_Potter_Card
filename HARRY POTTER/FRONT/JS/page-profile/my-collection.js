document.addEventListener("DOMContentLoaded", async () => {
    try {
        const token = localStorage.getItem("token"); //on récupère le token

        if (!token) {
            // si le token n'est pas trouvé alors on affiche une erreur
            console.error("token non trouvé");
            return;
        }

        const headers = {
            // on definit les headers pour la requête
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // on ajoute le token dans les headers
        };

        const response = await fetch("http://localhost:3000/inventory", {
            //on fetch l'url de l'inventaire
            headers: headers, // on ajoute les headers
        });

        if (!response.ok) {
            // si le fetch n'est pas ok alors on affiche une erreur
            throw new Error("n'a pas fetch reussi l'inventaire");
        }

        const { inventory } = await response.json(); // on récupère l'inventaire via le json de l'url fetch
        console.log(inventory);

        const cardContainer = document.querySelector(
            ".collection-container .mid"
        );
        inventory.forEach((inventoryItem) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");

            const cardImage = document.createElement("img");
            cardImage.classList.add("card-img");
            cardImage.src = inventoryItem.card.imageUrl;

            const cardName = document.createElement("h2");
            cardName.classList.add("card-name");
            cardName.textContent = inventoryItem.card.name;

            cardElement.appendChild(cardImage);
            cardElement.appendChild(cardName);

            cardContainer.appendChild(cardElement);
        });
    } catch (error) {
        console.error("pas d'inventaire trouvé", error);
    }
});
