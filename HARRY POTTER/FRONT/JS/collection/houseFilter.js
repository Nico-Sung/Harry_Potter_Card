// filtre des cartes

document.getElementById("houseFilter").addEventListener("change", function (e) {
    var house = e.target.value; //récupère la valeur de la maison sélectionnée
    fetchCards(house); //appelle la fonction fetchCards avec la maison sélectionnée
});

function fetchCards(h) {
    fetch("https://hp-api.lainocs.fr/characters") //on cherche les personnages de l'api
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(h);
            if (h !== "all") {
                //si la maison n'est pas "all"
                data = data.filter((characters) => characters.house === h); // alors on filtre les personnages par maison si elle est =all on affiche toutes les maisons
            }
            console.log(data);
            displayCards(data); // on affiche les cartes
        })
        .catch((error) => console.log(error));
}

function displayCards(cards) {
    //fonction pour afficher les cartes
    var cardContainer = document.querySelector(".collection-container .mid");
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
            card.slug
        )}&image=${encodeURIComponent(card.image)}`;
        cardLink.appendChild(cardImage);

        cardElement.appendChild(cardLink);
        cardElement.appendChild(cardNameContainer);
        cardContainer.appendChild(cardElement);
    });
}
