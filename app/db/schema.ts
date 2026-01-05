import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    postId: integer("post_id").notNull(),
    text: text("text").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("comments_post_id_idx").on(t.postId)]
);

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
