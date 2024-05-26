// API collection

document.addEventListener("DOMContentLoaded", function () {
    function fetchCards() {
        fetch("https://hp-api.lainocs.fr/characters") //on cherche les personnages de l'api
            .then((reponse) => reponse.json())
            .then((data) => displayCards(data))
            .catch((error) => console.log(error));
    }

    function displayCards(cards) {
        //fonction pour afficher les cartes
        var cardContainer = document.querySelector(
            ".collection-container .mid"
        );
        cardContainer.innerHTML = "";
        cards.forEach(function (card) {
            var cardElement = document.createElement("div");
            cardElement.classList.add("card");

            var cardImage = document.createElement("img");
            cardImage.classList.add("card-img");
            cardImage.src = card.image;

            var cardNameContainer = document.createElement("div");
            cardNameContainer.classList.add("card-name-container");

            var cardName = document.createElement("h2");
            cardName.classList.add("card-name");
            cardName.textContent = card.name;

            var likeButton = document.createElement("button");
            likeButton.textContent = "Like";
            likeButton.classList.add("like-button");

            likeButton.addEventListener("click", function () {
                likeButton.classList.toggle("favorited");
            });

            cardNameContainer.appendChild(cardName);
            cardNameContainer.appendChild(likeButton);

            var cardLink = document.createElement("a");
            cardLink.href = `pageDetails.html?slug=${encodeURIComponent(
                card.slug //on ajoute le slug pour l'url de la page details
            )}&image=${encodeURIComponent(card.image)}`;
            cardLink.appendChild(cardImage);

            cardElement.appendChild(cardLink);
            cardElement.appendChild(cardNameContainer);
            cardContainer.appendChild(cardElement);
        });
    }
    fetchCards(); //on appelle la fonction fetchCards pour afficher les cartes
});
