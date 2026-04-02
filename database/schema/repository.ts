import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { star } from "./star";

export const repository = pgTable("repository", {
  id: text("id").primaryKey(), // GitHub Node ID
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  description: text("description"),
  url: text("url").notNull(),
  homepage: text("homepage"),
  archived: boolean("archived").default(false).notNull(),
  forks: integer("forks").default(0).notNull(),
  stars: integer("stars").default(0).notNull(),
  language: text("language"),
  branch: text("branch"),
  git: text("git").notNull(),

  licenseName: text("license_name"),
  licenseSlug: text("license_slug"),
  licenseUrl: text("license_url"),

  repositoryCreatedAt: timestamp("repository_created_at"),
  repositoryUpdatedAt: timestamp("repository_updated_at"),
  repositoryPushedAt: timestamp("repository_pushed_at"),

  ownerId: integer("owner_id").notNull(),
  ownerUsername: text("owner_username").notNull(),
  ownerAvatar: text("owner_avatar").notNull(),
  ownerUrl: text("owner_url").notNull(),

  syncedAt: timestamp("synced_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const repositoriesRelations = relations(repository, ({ many }) => ({
  stars: many(star),
}));
