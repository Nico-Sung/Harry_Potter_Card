import jsonwebtoken from "jsonwebtoken";

const generateToken = (user) => {
    return jsonwebtoken.sign(
        // génère un token avec l'utilisateur avec une expiration de 24h
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET, // prend la clé secrète
        {
            expiresIn: "24h",
        }
    );
};

export { generateToken };
