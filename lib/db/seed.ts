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
      description: "The formation of Earth from a solar nebula approximately 4.6 billion years ago. Since its origin, Earth has undergone massive geological and biological changes, cooling from a molten state to develop a crust, oceans, and a breathable atmosphere.",
      color: "#4CAF50",
      orderIndex: 0,
    })
    .returning() as GeologicalUnit[];
  
  const earth = results[0];

  console.log(`Created root node: ${earth.name} (${earth.id})`);

  // Insert Eons
  const eonsData = [
    { name: "Hadean", type: "eon", parentId: earth.id, startMya: 4600, endMya: 4000, color: "#9E9E9E", orderIndex: 1, description: "The earliest period of Earth's history, named after Hades. Characterized by Earth's initial formation from dust and gas, frequent collisions with planetesimals, and the formation of the Moon. A time of extreme heat and volcanism." },
    { name: "Archean", type: "eon", parentId: earth.id, startMya: 4000, endMya: 2500, color: "#795548", orderIndex: 2, description: "The eon when Earth's crust cooled enough for continents to form. The earliest life, likely single-celled cyanobacteria, appeared in the oceans. Earth's atmosphere was composed of volcanic gases and lacked oxygen." },
    { name: "Proterozoic", type: "eon", parentId: earth.id, startMya: 2500, endMya: 541, color: "#3F51B5", orderIndex: 3, description: "A long eon spanning from 2.5 billion to 541 million years ago. Witnessed the rise of atmospheric oxygen (The Great Oxidation Event), the first multicellular organisms, and complex life forms like the Ediacara biota." },
    { name: "Phanerozoic", type: "eon", parentId: earth.id, startMya: 541, endMya: 0, color: "#2196F3", orderIndex: 4, description: "The current eon, meaning 'visible life'. Characterized by an explosion of biodiversity and the dominance of complex organisms, including plants, dinosaurs, mammals, and humans." },
  ];

  const insertedEons = await db.insert(geologicalUnits).values(eonsData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedEons.length} eons.`);

  const phanerozoic = insertedEons.find((e: GeologicalUnit) => e.name === "Phanerozoic")!;

  // Insert Eras for Phanerozoic
  const erasData = [
    { name: "Paleozoic", type: "era", parentId: phanerozoic.id, startMya: 541, endMya: 252, color: "#8BC34A", orderIndex: 1, description: "The 'Age of Ancient Life', marking the first appearance of diverse marine life, the first land plants, and early vertebrates like fish and amphibians. Ended with the largest mass extinction in history." },
    { name: "Mesozoic", type: "era", parentId: phanerozoic.id, startMya: 252, endMya: 66, color: "#FF9800", orderIndex: 2, description: "The 'Age of Reptiles' or 'Age of Dinosaurs'. A time when dinosaurs ruled the land, the first birds and mammals appeared, and the supercontinent Pangea began to break apart." },
    { name: "Cenozoic", type: "era", parentId: phanerozoic.id, startMya: 66, endMya: 0, color: "#F44336", orderIndex: 3, description: "The 'Age of Mammals', stretching from the extinction of the dinosaurs to the present day. Characterized by the diversification of mammals, the rise of flowering plants, and the eventual appearance of humans." },
  ];

  const insertedEras = await db.insert(geologicalUnits).values(erasData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedEras.length} eras.`);

  const paleozoic = insertedEras.find((e: GeologicalUnit) => e.name === "Paleozoic")!;
  const mesozoic = insertedEras.find((e: GeologicalUnit) => e.name === "Mesozoic")!;
  const cenozoic = insertedEras.find((e: GeologicalUnit) => e.name === "Cenozoic")!;

  // Insert Periods for Paleozoic
  const paleozoicPeriods = [
    { name: "Cambrian", type: "period", parentId: paleozoic.id, startMya: 541, endMya: 485, color: "#00BCD4", orderIndex: 1, description: "Famous for the 'Cambrian Explosion', a rapid diversification of life forms in the ocean, including the first trilobites and brachiopods." },
    { name: "Ordovician", type: "period", parentId: paleozoic.id, startMya: 485, endMya: 444, color: "#009688", orderIndex: 2, description: "Characterized by diverse marine invertebrates and the first primitive plants appearing on land. Ended with a major ice age and mass extinction." },
    { name: "Silurian", type: "period", parentId: paleozoic.id, startMya: 444, endMya: 419, color: "#4CAF50", orderIndex: 3, description: "A period of recovery and stabilization. The first vascular plants appeared on land, and jawed fish began to diversify in the oceans." },
    { name: "Devonian", type: "period", parentId: paleozoic.id, startMya: 419, endMya: 359, color: "#8BC34A", orderIndex: 4, description: "The 'Age of Fishes'. Seen the rise of the first forests and the first tetrapods (four-legged animals) beginning to walk on land." },
    { name: "Carboniferous", type: "period", parentId: paleozoic.id, startMya: 359, endMya: 299, color: "#CDDC39", orderIndex: 5, description: "Known for vast swamp forests that eventually became coal beds. Large amphibians and the first reptiles appeared, and oxygen levels were high." },
    { name: "Permian", type: "period", parentId: paleozoic.id, startMya: 299, endMya: 252, color: "#FFC107", orderIndex: 6, description: "The final period of the Paleozoic. Ended with the 'Great Dying', the most severe mass extinction event, which paved the way for the rise of dinosaurs." },
  ];

  // Insert Periods for Mesozoic
  const mesozoicPeriods = [
    { name: "Triassic", type: "period", parentId: mesozoic.id, startMya: 252, endMya: 201, color: "#FF5722", orderIndex: 1, description: "The start of the Mesozoic. Followed the Great Permian Extinction, seeing the first small dinosaurs and the first mammals evolve." },
    { name: "Jurassic", type: "period", parentId: mesozoic.id, startMya: 201, endMya: 145, color: "#FF9800", orderIndex: 2, description: "The golden age of dinosaurs, including giants like Brachiosaurus and Diplodocus. Birds first appeared, and Pangea continued to split." },
    { name: "Cretaceous", type: "period", parentId: mesozoic.id, startMya: 145, endMya: 66, color: "#FFEB3B", orderIndex: 3, description: "The peak of dinosaur diversity, featuring T-Rex and Triceratops. Ended with a massive asteroid impact that caused the extinction of non-avian dinosaurs." },
  ];

  // Insert Periods for Cenozoic
  const cenozoicPeriods = [
    { name: "Paleogene", type: "period", parentId: cenozoic.id, startMya: 66, endMya: 23, color: "#E91E63", orderIndex: 1, description: "The beginning of the Cenozoic. Mammals and birds diversified into the ecological niches left by the dinosaurs." },
    { name: "Neogene", type: "period", parentId: cenozoic.id, startMya: 23, endMya: 2.6, color: "#9C27B0", orderIndex: 2, description: "Characterized by the further evolution of mammals and birds, and the spread of grasslands. Early ancestors of humans appeared." },
    { name: "Quaternary", type: "period", parentId: cenozoic.id, startMya: 2.6, endMya: 0, color: "#673AB7", orderIndex: 3, description: "The current geological period, marked by a series of ice ages and the rise of modern humans (Homo sapiens)." },
  ];

  const allPeriodsData = [...paleozoicPeriods, ...mesozoicPeriods, ...cenozoicPeriods];
  const insertedPeriods = await db.insert(geologicalUnits).values(allPeriodsData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedPeriods.length} periods.`);

  const paleogene = insertedPeriods.find((p: GeologicalUnit) => p.name === "Paleogene")!;
  const neogene = insertedPeriods.find((p: GeologicalUnit) => p.name === "Neogene")!;
  const quaternary = insertedPeriods.find((p: GeologicalUnit) => p.name === "Quaternary")!;

  // Insert Epochs
  const epochsData = [
    { name: "Paleocene", type: "epoch", parentId: paleogene.id, startMya: 66, endMya: 56, color: "#F06292", orderIndex: 1, description: "The first epoch after the dinosaur extinction, a warm period where mammals began to evolve into larger forms." },
    { name: "Eocene", type: "epoch", parentId: paleogene.id, startMya: 56, endMya: 33.9, color: "#EC407A", orderIndex: 2, description: "A time of 'dawn' for modern mammals. Earth was warm, and forests stretched from pole to pole." },
    { name: "Oligocene", type: "epoch", parentId: paleogene.id, startMya: 33.9, endMya: 23, color: "#D81B60", orderIndex: 3, description: "A transition period where climates cooled, and grasslands began to replace forests, influencing mammal evolution." },
    { name: "Miocene", type: "epoch", parentId: neogene.id, startMya: 23, endMya: 5.3, color: "#BA68C8", orderIndex: 1, description: "A time of significant diversification of apes and other mammals. High mountains like the Himalayas formed during this time." },
    { name: "Pliocene", type: "epoch", parentId: neogene.id, startMya: 5.3, endMya: 2.6, color: "#AB47BC", orderIndex: 2, description: "A period of cooling and drying. Early hominids like Australopithecus appeared in Africa." },
    { name: "Pleistocene", type: "epoch", parentId: quaternary.id, startMya: 2.6, endMya: 0.0117, color: "#7E57C2", orderIndex: 1, description: "The 'Ice Age' epoch, characterized by the expansion and retreat of massive glaciers and the evolution of Neanderthals and early modern humans." },
    { name: "Holocene", type: "epoch", parentId: quaternary.id, startMya: 0.0117, endMya: 0, color: "#5E35B1", orderIndex: 2, description: "The current geological epoch, starting about 11,700 years ago. Noted for the development of human civilization and stable climates." },
  ];

  const insertedEpochs = await db.insert(geologicalUnits).values(epochsData).returning() as GeologicalUnit[];
  console.log(`Inserted ${insertedEpochs.length} epochs.`);

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
