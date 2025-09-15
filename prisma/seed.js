const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const products = require("./data/product.js");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword1 = await bcrypt.hash("123456", 10);
  const hashedPassword2 = await bcrypt.hash("200114", 10);

  await prisma.user.create({
    data: {
      name: "Test User",
      email: "beherabiswajit344@gmail.com",
      password: hashedPassword1, 
    },
  });

  await prisma.user.create({
    data: {
      name: "Bikun",
      email: "bikun@2gmail.com",
      password: hashedPassword2, 
    },
  });


  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category,
        quantity: p.quantity,
        image: p.image,
      },
    });
  }

  console.log("✅ Seeding done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
