//connexion

const formulaire = document.querySelector(".form2");

formulaire.addEventListener("submit", async (event) => {
    event.preventDefault(); //empêche le rechargement de la page

    const email = document.getElementById("Mail").value;
    const password = document.getElementById("Mot de passe").value;

    const response = await fetch("http://localhost:3000/login", {
        //fetch pour envoyer les données à la base de données
        method: "POST",
        body: JSON.stringify({ email, password }), //envoie de l'email et du mot de passe en JSON
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    const token = data.token; //récupère le token
    const userId = data.user.id; //récupère l'id de l'utilisateur

    localStorage.setItem("token", token); //stocke le token dans le local storage
    localStorage.setItem("userId", userId); //stocke l'id de l'utilisateur dans le local storage

    window.location.href = "../HTML/homepage2.html";
});
