import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds);
}; // hash le mot de passe

export const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash); // compare le mot de passe avec le hash
};
