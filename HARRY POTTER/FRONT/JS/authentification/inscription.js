// inscription de l'utilisateur
const formulaire = document.querySelector(".form1");

formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("Mail").value;
    const password = document.getElementById("Mot de passe").value;
    const username = document.getElementById("Name").value;

    const response = await fetch("http://localhost:3000/users", {
        //fetch pour envoyer les données à la base de données
        method: "POST",
        body: JSON.stringify({ email, password, name: username }), //envoie de l'email, du mot de passe et du nom de l'utilisateur en JSON
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json(); //récupération des données

    const token = data.token; //récupère le token

    localStorage.setItem("token", token); //stocke le token dans le local storage

    window.location.href = "../HTML/seConnecter.html"; //envoie l'utilisateur sur la page de connexion
});
