//carte dans homepage

document.addEventListener("DOMContentLoaded", function () {
    function fetchCards() {
        fetch("https://hp-api.lainocs.fr/characters")
            .then((response) => response.json())
            .then((data) => displayCards(data))
            .catch((error) => console.log(error));
    }

    function displayCards(carouselCards) {
        //fonction pour afficher les cartes
        const carousel = document.querySelector(".carousel");
        carouselCards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");

            const cardLink = document.createElement("a");
            cardLink.href = `pageDetails.html?slug=${encodeURIComponent(
                card.slug
            )}&image=${encodeURIComponent(card.image)}`;

            const img = document.createElement("img");
            img.src = card.image;
            cardLink.appendChild(img);

            cardElement.appendChild(cardLink);

            const name = document.createElement("h1");
            name.textContent = card.name;
            cardElement.appendChild(name);

            carousel.appendChild(cardElement);
        });
    }

    fetchCards();
});
