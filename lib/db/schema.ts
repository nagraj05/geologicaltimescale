import { pgTable, uuid, text, doublePrecision, integer, timestamp } from "drizzle-orm/pg-core";

export const geologicalUnits = pgTable("geological_units", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: text("type").notNull(), // root, eon, era, period, epoch
  parentId: uuid("parent_id").references(() => geologicalUnits.id),
  startMya: doublePrecision("start_mya"),
  endMya: doublePrecision("end_mya"),
  description: text("description"),
  color: text("color"),
  orderIndex: integer("order_index"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type GeologicalUnit = typeof geologicalUnits.$inferSelect;
export type NewGeologicalUnit = typeof geologicalUnits.$inferInsert;
