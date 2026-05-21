import {
  pgTable,
  text,
  varchar,
  timestamp,
  index,
  bigint,
} from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    clerkUserId: text("clerk_user_id").notNull(),
    shortCode: varchar("short_code", { length: 8 }).notNull().unique(),
    originalUrl: text("original_url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_clerk_user_id").on(table.clerkUserId),
    index("idx_short_code").on(table.shortCode),
  ],
);
