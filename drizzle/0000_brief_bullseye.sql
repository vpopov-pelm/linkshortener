CREATE TABLE "links" (
	"id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "links_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"clerk_user_id" text NOT NULL,
	"short_code" varchar(8) NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_code_unique" UNIQUE("short_code")
);
--> statement-breakpoint
CREATE INDEX "idx_clerk_user_id" ON "links" USING btree ("clerk_user_id");--> statement-breakpoint
CREATE INDEX "idx_short_code" ON "links" USING btree ("short_code");