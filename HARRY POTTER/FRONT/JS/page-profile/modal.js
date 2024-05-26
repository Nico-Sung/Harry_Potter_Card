//modal

var modal = document.getElementById("modal");
var btn = document.getElementById("floating-button");
var span = document.querySelector(".close");

btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document
    .getElementById("exchange-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        var person = document.getElementById("person").value;
        var card = document.getElementById("card").value;
        console.log("Échange de la carte " + card + " avec " + person);
    });
