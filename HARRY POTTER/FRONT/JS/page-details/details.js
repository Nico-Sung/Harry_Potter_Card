//page details

//fonction pour afficher les données du personnage
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search); //on récupère les paramètres de l'url
    const slug = urlParams.get("slug"); //on récupère le slug
    function fetchCharacter(slug) {
        //fonction pour récupérer les données du personnage via le fetch
        fetch(
            `https://hp-api.lainocs.fr/characters/${encodeURIComponent(slug)}` //on récupère les données du personnage via le slug
        )
            .then((response) => response.json())
            .then((data) => displayCharacter(data))
            .catch((error) => console.log(error));
    }

    function displayCharacter(character) {
        //fonction pour afficher les données du personnage
        document.querySelector("#name").textContent = character.name;
        document.querySelector("#image").src = character.image;
        document.querySelector("#eyes").textContent = character.eyes;
        document.querySelector("#birthday").textContent = character.birthday;
        document.querySelector("#blood").textContent = character.blood;
        document.querySelector("#house").textContent = character.house;
    }

    fetchCharacter(slug); //on appelle la fonction fetchCharacter pour afficher les données du personnage

    //I0T
    fetch(`https://hp-api.lainocs.fr/characters/${encodeURIComponent(slug)}`) // on récupère les données du personnage via le slug
        .then((response) => response.json())
        .then((character) => {
            fetch("http://172.20.10.3:3000/currentHouse", {
                //on envoie les données du personnage à la base de données /currentHouse
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ house: character.house }), //envoie de la maison du personnage en JSON
            });
        })
        .catch((error) => console.log(error));

    //afficher les cartes similaires
    fetch("https://hp-api.lainocs.fr/characters")
        .then((response) => response.json())
        .then((allCards) => {
            fetch("https://hp-api.lainocs.fr/characters/" + slug) //on récupère les données du personnage via le slug
                .then((response) => response.json())
                .then((currentCard) => {
                    const similarCards = allCards.filter(
                        //on filtre les cartes pour afficher les cartes similaires
                        (card) => card.house === currentCard.house // selon les maisons
                    );

                    const carousel = document.querySelector(".carousel");
                    similarCards.forEach((card) => {
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
                });
        });
});
