import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Connection to database successful");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
