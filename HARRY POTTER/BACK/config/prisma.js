import prisma from "@prisma/client";
const { PrismaClient } = prisma;
// const { PrismaClient } = require('@prisma/client');

export default new PrismaClient();
// module.exports = new PrismaClient();
