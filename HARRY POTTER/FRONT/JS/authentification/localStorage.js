// sauvegarde l'email dans le localStorage pour qu'il soit prérempli lors de la prochaine connexion

window.onload = function () {
    let inputEmail = document.getElementById("Mail");
    if (localStorage.getItem("email")) {
        inputEmail.value = localStorage.getItem("email");
    }

    inputEmail.onchange = function () {
        localStorage.setItem("email", inputEmail.value);
    }; //
};
