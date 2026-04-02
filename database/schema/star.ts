import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./user";
import { repository } from "./repository";
import { starTag } from "./star-tag";

export const star = pgTable("star", {
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  repoId: text("repo_id").notNull().references(() => repository.id, { onDelete: "cascade" }),
  starredAt: timestamp("starred_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (t) => [
  primaryKey({ columns: [t.userId, t.repoId] }),
]);

export const starsRelations = relations(star, ({ one, many }) => ({
  user: one(user, {
    fields: [star.userId],
    references: [user.id],
  }),
  repository: one(repository, {
    fields: [star.repoId],
    references: [repository.id],
  }),
  starTags: many(starTag),
}));
