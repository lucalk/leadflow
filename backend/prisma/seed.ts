import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL

if(!connectionString){
    throw new Error("DATABASE_URL is missing in .env")
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if(!email || !password){
        throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD sont requis")
    }

    const existingAdmin = await prisma.admin.findUnique({
        where: { email }
    })

    if(existingAdmin){
        console.log("ADMIN déjà existant")
        return
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.admin.create({
        data: { email, passwordHash }
    })

    console.log("ADMIN créé avec succès")
}

main()
.catch((error) => {
    console.log(error)
    process.exit(1)
})
.finally(async ()=> {
    await prisma.$disconnect()
})