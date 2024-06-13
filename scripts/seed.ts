const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      {
        name: "PDL",
        subCategories: {
          create: [
            { name: " DRIVERS JOURNEY" },
            { name: "HIGHWAY CODE" },
            { name: "BASICS" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "BLIND SPOTS",
        subCategories: {
          create: [
            { name: "MIRRORS" },
            { name: "CURVES" },
            { name: "RISES" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "DRIVING AT NIGHT",
        subCategories: {
          create: [
            { name: "CONJESTED AREAS " },
            { name: "SINGLE LANE" },
            { name: "DOUBLE LANE" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "PARKING DISTANCE ",
        subCategories: {
          create: [
            { name: "CONERS " },
            { name: "TOWN" },
            { name: "RURAL AREAS" },
            { name: "Others" },
          ],
        },
      },
    ];

    // Sequentially create each category with its subcategories
    for (const category of categories) {
      await database.category.create({
        data: {
          name: category.name,
          subCategories: category.subCategories,
        },
        include: {
          subCategories: true,
        },
      });
    }

    await database.level.createMany({
      data: [
        { name: "Beginner" },
        { name: "Intermediate" },
        { name: "Expert" },
        { name: "All levels" },
      ],
    });

    console.log("Seeding successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  } finally {
    await database.$disconnect();
  }
}

main();
