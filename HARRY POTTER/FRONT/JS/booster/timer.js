//TIMER

async function fetchUpdateTimer() {
    const token = localStorage.getItem("token"); // on recupère le token dans le local storage pour l'autorisation du header
    const userId = localStorage.getItem("userId");
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
        //on fetch l'url de l'utilisateur pour prendre le temps restant avant le prochain booster
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response);

    if (response.ok) {
        const user = await response.json();
        const now = new Date(); //on récupère la date actuelle
        const nextBoosterTime = new Date(user.nextBoosterTime); //on récupère la date du prochain booster
        const timeLeft = nextBoosterTime - now; //on calcule le temps restant avant le prochain booster en soustrayant la date actuelle à la date du prochain booster

        const timerElement = document.getElementById("booster-timer");

        if (timeLeft < 0) {
            //si le temps restant est inférieur à 0 alors le prochain booster est disponible et mettre un message
            timerElement.textContent = `Le prochain booster est déjà disponible !`;
        } else {
            //sinon on affiche le temps restant avant le prochain booster
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor(
                (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            timerElement.textContent = `Temps restant avant le prochain booster : ${hours} heures, ${minutes} minutes, ${seconds} secondes`;
        }
    }
}

fetchUpdateTimer(); //on appelle la fonction pour mettre à jour le timer
