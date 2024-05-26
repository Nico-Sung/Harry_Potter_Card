//INFO

const userId = localStorage.getItem("userId"); //on récupère l'id de l'utilisateur dans le local storage

if (userId) {
    fetch(`http://localhost:3000/users/${userId}`) //on fetch l'url de l'utilisateur
        .then((response) => response.json())
        .then((userInfo) => {
            localStorage.setItem("userInfo", JSON.stringify(userInfo)); //on stocke les infos de l'utilisateur dans le local storage

            const nameElement = document.getElementById("name"); //on récupère le nom l'utilisateur
            const emailElement = document.getElementById("mail"); //on récupère l'email de l'utilisateur

            nameElement.textContent = userInfo.name; //on affiche le nom de l'utilisateur
            emailElement.textContent = userInfo.email; //on affiche l'email de l'utilisateur
        })
        .catch((error) => console.error("erreur:", error)); //on affiche une erreur si il y en a une
} else {
    console.error("pas de userId trouvé");
}
