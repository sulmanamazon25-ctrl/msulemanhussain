import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const productStatusEnum = pgEnum("product_status", ["draft", "live"]);
export const orderKindEnum = pgEnum("order_kind", ["digital", "session"]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "awaiting_schedule",
  "scheduled",
  "done",
  "refunded",
  "failed",
]);

export const digitalProducts = pgTable("digital_products", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: varchar("title", { length: 240 }).notNull(),
  shortDescription: text("short_description").notNull().default(""),
  longDescription: text("long_description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("eur"),
  status: productStatusEnum("status").notNull().default("draft"),
  tags: text("tags").notNull().default(""),
  seoTitle: varchar("seo_title", { length: 240 }),
  seoDescription: text("seo_description"),
  ogImagePath: text("og_image_path"),
  coverImagePath: text("cover_image_path"),
  filePath: text("file_path"),
  fileName: varchar("file_name", { length: 260 }),
  fileSize: integer("file_size"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessionPackages = pgTable("session_packages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  name: varchar("name", { length: 240 }).notNull(),
  blurb: text("blurb").notNull().default(""),
  durationMinutes: integer("duration_minutes").notNull(),
  topicLabel: varchar("topic_label", { length: 160 }).notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("eur"),
  status: productStatusEnum("status").notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  kind: orderKindEnum("kind").notNull(),
  status: orderStatusEnum("status").notNull().default("pending"),
  digitalProductId: uuid("digital_product_id").references(() => digitalProducts.id),
  sessionPackageId: uuid("session_package_id").references(() => sessionPackages.id),
  buyerEmail: varchar("buyer_email", { length: 320 }).notNull(),
  buyerName: varchar("buyer_name", { length: 200 }),
  topic: varchar("topic", { length: 160 }),
  amountCents: integer("amount_cents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("eur"),
  stripeCheckoutSessionId: varchar("stripe_checkout_session_id", { length: 200 }),
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 200 }),
  scheduleNotes: text("schedule_notes"),
  preferredTimes: text("preferred_times"),
  productSnapshot: text("product_snapshot").notNull().default("{}"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export const downloadTokens = pgTable("download_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id),
  token: varchar("token", { length: 64 }).notNull().unique(),
  downloadCount: integer("download_count").notNull().default(0),
  maxDownloads: integer("max_downloads").notNull().default(5),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type DigitalProduct = typeof digitalProducts.$inferSelect;
export type SessionPackage = typeof sessionPackages.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type DownloadToken = typeof downloadTokens.$inferSelect;
