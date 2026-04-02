import { relations } from "drizzle-orm";
import { pgTable, text, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { star } from "./star";
import { tag } from "./tag";

export const starTag = pgTable("star_tag", {
  userId: text("user_id").notNull(),
  repoId: text("repo_id").notNull(),
  tagId: text("tag_id").notNull().references(() => tag.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.repoId, t.tagId] }),
}));

export const starTagRelations = relations(starTag, ({ one }) => ({
  star: one(star, {
    fields: [starTag.userId, starTag.repoId],
    references: [star.userId, star.repoId],
  }),
  tag: one(tag, {
    fields: [starTag.tagId],
    references: [tag.id],
  }),
}));
