
//Prisma Client connection code

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma =
  globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;


//Generating Prisma Client means creating the database interaction code from the Prisma schema.
//The generated code contains the methods required to interact with the database.
//Creating Prisma Client means creating an object (instance) that we use to communicate with the database.

//Prisma Client + PostgreSQL Adapter = Database Connectivity