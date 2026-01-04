ALTER TABLE "customers" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "id" SET DATA TYPE INT;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "owner_id" uuid;--> statement-breakpoint
UPDATE "customers" SET "owner_id" = '3018a5d5-a542-40bf-ba4d-f0ed355576d4';--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "owner_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;