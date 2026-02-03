import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const demoPassword = bcrypt.hashSync("demo1234", 10);
  await prisma.user.upsert({
    where: { username: "demo" },
    update: { password: demoPassword },
    create: {
      username: "demo",
      password: demoPassword,
    },
  });
  console.log("Seed done: demo user (username: demo, password: demo1234)");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
