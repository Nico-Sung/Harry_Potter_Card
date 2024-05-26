document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("userId");

    // fonction pour ouvrir et fermer les modals
    function openModal(content) {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                ${content}
            </div>
        `;
        document.body.appendChild(modal);

        // affiche le modal
        modal.style.display = "block";

        modal.querySelector(".close").addEventListener("click", () => {
            // cache le modal
            modal.style.display = "none";
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                // cache le modal
                modal.style.display = "none";
            }
        });

        return modal;
    }

    // formulaire pour modifier pseudo
    document
        .querySelector(".modify-pseudo")
        .addEventListener("click", (event) => {
            event.preventDefault();
            const content = `
            <form id="form-modify-pseudo">
                <label for="new-pseudo">Nouveau pseudonyme</label>
                <input type="text" id="new-pseudo" placeholder="Nouveau pseudonyme" required />
                <button type="submit">Modifier</button>
            </form>
        `;
            const modal = openModal(content);
            modal
                .querySelector("#form-modify-pseudo")
                .addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const newPseudo = modal.querySelector("#new-pseudo").value;
                    await updateUserInfo(userId, { name: newPseudo });
                    document.body.removeChild(modal);
                });
        });

    // formulaire pour modifier l'email
    document
        .querySelector(".modify-mail")
        .addEventListener("click", (event) => {
            event.preventDefault();
            const content = `
            <form id="form-modify-mail">
                <label for="new-mail">Nouvel email</label>
                <input type="email" id="new-mail" placeholder="Nouvel email" required />
                <button type="submit">Modifier</button>
            </form>
        `;
            const modal = openModal(content);
            modal
                .querySelector("#form-modify-mail")
                .addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const newMail = modal.querySelector("#new-mail").value;
                    await updateUserInfo(userId, { email: newMail });
                    document.body.removeChild(modal);
                });
        });

    // formulaire pour modifier le mot de passe
    document.querySelector(".modify-mdp").addEventListener("click", (event) => {
        event.preventDefault();
        const content = `
            <form id="form-modify-mdp">
                <label for="new-mdp">Nouveau mot de passe</label>
                <input type="password" id="new-mdp" placeholder="Nouveau mot de passe" required />
                <button type="submit">Modifier</button>
            </form>
        `;
        const modal = openModal(content);
        modal
            .querySelector("#form-modify-mdp")
            .addEventListener("submit", async (event) => {
                event.preventDefault();
                const newMdp = modal.querySelector("#new-mdp").value;
                await updateUserInfo(userId, { password: newMdp });
                document.body.removeChild(modal);
            });
    });

    // fonction pour mettre à jour les informations utilisateur via le backend
    async function updateUserInfo(userId, updatedData) {
        try {
            const response = await fetch(
                `http://localhost:3000/users/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedData),
                }
            );
            if (!response.ok) {
                throw new Error(
                    "Erreur lors de la mise à jour des informations utilisateur"
                );
            }
            const updatedUser = await response.json();
            alert("Informations mises à jour avec succès");
        } catch (error) {
            console.error("Erreur:", error);
            alert(error.message);
        }
    }
});
