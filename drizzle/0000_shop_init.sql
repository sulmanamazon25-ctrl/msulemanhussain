-- Shop schema: digital products, session packages, orders, download tokens
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE "public"."product_status" AS ENUM('draft', 'live');
CREATE TYPE "public"."order_kind" AS ENUM('digital', 'session');
CREATE TYPE "public"."order_status" AS ENUM('pending', 'paid', 'awaiting_schedule', 'scheduled', 'done', 'refunded', 'failed');

CREATE TABLE "digital_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(160) NOT NULL,
	"title" varchar(240) NOT NULL,
	"short_description" text DEFAULT '' NOT NULL,
	"long_description" text DEFAULT '' NOT NULL,
	"price_cents" integer NOT NULL,
	"currency" varchar(3) DEFAULT 'eur' NOT NULL,
	"status" "product_status" DEFAULT 'draft' NOT NULL,
	"tags" text DEFAULT '' NOT NULL,
	"seo_title" varchar(240),
	"seo_description" text,
	"og_image_path" text,
	"cover_image_path" text,
	"file_path" text,
	"file_name" varchar(260),
	"file_size" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "digital_products_slug_unique" UNIQUE("slug")
);

CREATE TABLE "session_packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(160) NOT NULL,
	"name" varchar(240) NOT NULL,
	"blurb" text DEFAULT '' NOT NULL,
	"duration_minutes" integer NOT NULL,
	"topic_label" varchar(160) DEFAULT '' NOT NULL,
	"price_cents" integer NOT NULL,
	"currency" varchar(3) DEFAULT 'eur' NOT NULL,
	"status" "product_status" DEFAULT 'draft' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_packages_slug_unique" UNIQUE("slug")
);

CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kind" "order_kind" NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"digital_product_id" uuid,
	"session_package_id" uuid,
	"buyer_email" varchar(320) NOT NULL,
	"buyer_name" varchar(200),
	"topic" varchar(160),
	"amount_cents" integer NOT NULL,
	"currency" varchar(3) DEFAULT 'eur' NOT NULL,
	"stripe_checkout_session_id" varchar(200),
	"stripe_payment_intent_id" varchar(200),
	"schedule_notes" text,
	"preferred_times" text,
	"product_snapshot" text DEFAULT '{}' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone
);

CREATE TABLE "download_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"token" varchar(64) NOT NULL,
	"download_count" integer DEFAULT 0 NOT NULL,
	"max_downloads" integer DEFAULT 5 NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "download_tokens_token_unique" UNIQUE("token")
);

ALTER TABLE "orders" ADD CONSTRAINT "orders_digital_product_id_digital_products_id_fk" FOREIGN KEY ("digital_product_id") REFERENCES "public"."digital_products"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "orders" ADD CONSTRAINT "orders_session_package_id_session_packages_id_fk" FOREIGN KEY ("session_package_id") REFERENCES "public"."session_packages"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "download_tokens" ADD CONSTRAINT "download_tokens_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
