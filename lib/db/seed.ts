import { db } from "./index";
import { geologicalUnits, type GeologicalUnit } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Insert Earth (Root)
  const results = await db
    .insert(geologicalUnits)
    .values({
      name: "Earth",
      type: "root",
      startMya: 4600,
      endMya: 0,
      description: "Formation of Earth to present",
      color: "#4CAF50",
      orderIndex: 0,
    })
    .returning() as GeologicalUnit[];
  
  const earth = results[0];

  console.log(`Created root node: ${earth.name} (${earth.id})`);

  // Insert Eons
  const eonsData = [
    { name: "Hadean", type: "eon", parentId: earth.id, startMya: 4600, endMya: 4000, color: "#9E9E9E", orderIndex: 1 },
    { name: "Archean", type: "eon", parentId: earth.id, startMya: 4000, endMya: 2500, color: "#795548", orderIndex: 2 },
    { name: "Proterozoic", type: "eon", parentId: earth.id, startMya: 2500, endMya: 541, color: "#3F51B5", orderIndex: 3 },
    { name: "Phanerozoic", type: "eon", parentId: earth.id, startMya: 541, endMya: 0, color: "#2196F3", orderIndex: 4 },
  ];

  const insertedEons = await db.insert(geologicalUnits).values(eonsData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedEons.length} eons.`);

  const phanerozoic = insertedEons.find((e: GeologicalUnit) => e.name === "Phanerozoic")!;

  // Insert Eras for Phanerozoic
  const erasData = [
    { name: "Paleozoic", type: "era", parentId: phanerozoic.id, startMya: 541, endMya: 252, color: "#8BC34A", orderIndex: 1 },
    { name: "Mesozoic", type: "era", parentId: phanerozoic.id, startMya: 252, endMya: 66, color: "#FF9800", orderIndex: 2 },
    { name: "Cenozoic", type: "era", parentId: phanerozoic.id, startMya: 66, endMya: 0, color: "#F44336", orderIndex: 3 },
  ];

  const insertedEras = await db.insert(geologicalUnits).values(erasData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedEras.length} eras.`);

  const paleozoic = insertedEras.find((e: GeologicalUnit) => e.name === "Paleozoic")!;
  const mesozoic = insertedEras.find((e: GeologicalUnit) => e.name === "Mesozoic")!;
  const cenozoic = insertedEras.find((e: GeologicalUnit) => e.name === "Cenozoic")!;

  // Insert Periods for Paleozoic
  const paleozoicPeriods = [
    { name: "Cambrian", type: "period", parentId: paleozoic.id, startMya: 541, endMya: 485, color: "#00BCD4", orderIndex: 1 },
    { name: "Ordovician", type: "period", parentId: paleozoic.id, startMya: 485, endMya: 444, color: "#009688", orderIndex: 2 },
    { name: "Silurian", type: "period", parentId: paleozoic.id, startMya: 444, endMya: 419, color: "#4CAF50", orderIndex: 3 },
    { name: "Devonian", type: "period", parentId: paleozoic.id, startMya: 419, endMya: 359, color: "#8BC34A", orderIndex: 4 },
    { name: "Carboniferous", type: "period", parentId: paleozoic.id, startMya: 359, endMya: 299, color: "#CDDC39", orderIndex: 5 },
    { name: "Permian", type: "period", parentId: paleozoic.id, startMya: 299, endMya: 252, color: "#FFC107", orderIndex: 6 },
  ];

  // Insert Periods for Mesozoic
  const mesozoicPeriods = [
    { name: "Triassic", type: "period", parentId: mesozoic.id, startMya: 252, endMya: 201, color: "#FF5722", orderIndex: 1 },
    { name: "Jurassic", type: "period", parentId: mesozoic.id, startMya: 201, endMya: 145, color: "#FF9800", orderIndex: 2 },
    { name: "Cretaceous", type: "period", parentId: mesozoic.id, startMya: 145, endMya: 66, color: "#FFEB3B", orderIndex: 3 },
  ];

  // Insert Periods for Cenozoic
  const cenozoicPeriods = [
    { name: "Paleogene", type: "period", parentId: cenozoic.id, startMya: 66, endMya: 23, color: "#E91E63", orderIndex: 1 },
    { name: "Neogene", type: "period", parentId: cenozoic.id, startMya: 23, endMya: 2.6, color: "#9C27B0", orderIndex: 2 },
    { name: "Quaternary", type: "period", parentId: cenozoic.id, startMya: 2.6, endMya: 0, color: "#673AB7", orderIndex: 3 },
  ];

  const allPeriodsData = [...paleozoicPeriods, ...mesozoicPeriods, ...cenozoicPeriods];
  const insertedPeriods = await db.insert(geologicalUnits).values(allPeriodsData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedPeriods.length} periods.`);

  const paleogene = insertedPeriods.find((p: GeologicalUnit) => p.name === "Paleogene")!;
  const neogene = insertedPeriods.find((p: GeologicalUnit) => p.name === "Neogene")!;
  const quaternary = insertedPeriods.find((p: GeologicalUnit) => p.name === "Quaternary")!;

  // Insert Epochs
  const epochsData = [
    { name: "Paleocene", type: "epoch", parentId: paleogene.id, startMya: 66, endMya: 56, color: "#F06292", orderIndex: 1 },
    { name: "Eocene", type: "epoch", parentId: paleogene.id, startMya: 56, endMya: 33.9, color: "#EC407A", orderIndex: 2 },
    { name: "Oligocene", type: "epoch", parentId: paleogene.id, startMya: 33.9, endMya: 23, color: "#D81B60", orderIndex: 3 },
    { name: "Miocene", type: "epoch", parentId: neogene.id, startMya: 23, endMya: 5.3, color: "#BA68C8", orderIndex: 1 },
    { name: "Pliocene", type: "epoch", parentId: neogene.id, startMya: 5.3, endMya: 2.6, color: "#AB47BC", orderIndex: 2 },
    { name: "Pleistocene", type: "epoch", parentId: quaternary.id, startMya: 2.6, endMya: 0.0117, color: "#7E57C2", orderIndex: 1 },
    { name: "Holocene", type: "epoch", parentId: quaternary.id, startMya: 0.0117, endMya: 0, color: "#5E35B1", orderIndex: 2 },
  ];

  const insertedEpochs = await db.insert(geologicalUnits).values(epochsData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedEpochs.length} epochs.`);

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
