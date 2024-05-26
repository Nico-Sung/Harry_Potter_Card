// search bar pour la collection

const searchBar = document.querySelector(".searchh");
const character = document.getElementsByClassName("card");

searchBar.addEventListener("keyup", function (e) {
    const term = e.target.value.toLowerCase(); //on récupère la valeur de la recherche

    Array.from(character).forEach(function (character) {
        //on parcourt les personnages
        const cardText = character.textContent.toLowerCase(); //on récupère le texte des personnages

        if (cardText.includes(term)) {
            //si le texte des personnages contient la recherche
            character.style.display = "flex"; //alors on affiche les personnages en flex
        } else {
            //sinon on les cache
            character.style.display = "none";
        }
    });
});
