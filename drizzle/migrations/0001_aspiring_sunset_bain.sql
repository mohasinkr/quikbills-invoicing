DROP INDEX "invoices_customer_id_idx";--> statement-breakpoint
CREATE INDEX "idx_invoices_customer_createdat" ON "invoices" USING btree ("customer_id","created_at");