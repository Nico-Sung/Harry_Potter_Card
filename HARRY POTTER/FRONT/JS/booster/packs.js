//script pour ouvrir un booster
document.addEventListener("DOMContentLoaded", () => {
    const openBoosterButton = document.querySelector(".container-booster a"); //on selectionne le bouton pour ouvrir un booster
    openBoosterButton.addEventListener("click", async () => {
        // on ajoute ensuite un event listener pour ouvrir le booster
        try {
            // on ajoute un try catch pour gérer les erreurs potentielles
            const response = await fetch("http://localhost:3000/booster", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, //on ajoute le token pour l'authentification sinon on ne peut pas ouvrir le booster
                },
            });
            if (response.ok) {
                //si le fetch est ok
                const { cards } = await response.json(); // alors on récupère les cartes via le json de l'url fetch
                console.log(cards);

                const cardContainer = document.querySelector(".card-booster"); //on selectionne la div ou on va afficher les cartes

                cards.forEach((card) => {
                    //on boucle les cartes cartes gagnées
                    const cardElement = document.createElement("div");
                    cardElement.classList.add("card");

                    const cardImage = document.createElement("img");
                    cardImage.classList.add("card-img");
                    cardImage.src = card.imageUrl;

                    const cardName = document.createElement("h2");
                    cardName.classList.add("card-name");
                    cardName.textContent = card.name;

                    cardElement.appendChild(cardImage);
                    cardElement.appendChild(cardName);

                    cardContainer.appendChild(cardElement);
                });
            } else {
                // si le fetch n'est pas ok alors on affiche une erreur
                console.error(
                    "n'a pas reussi a ouvrir le booster:",
                    response.statusText
                );
            }
        } catch (error) {
            //s'il y a une erreur le try catch on l'affiche dans la console
            console.error("erreur:", error);
        }
    });
});
