DO $$ BEGIN
 CREATE TYPE "public"."priority" AS ENUM('Low', 'Medium', 'High', 'Urgent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Open', 'Completed', 'In Progress', 'On Hold', 'Duplicate', 'Reopened');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text,
	"summary" text,
	"description" text,
	"priority" "priority",
	"status" "status",
	"createdAt" timestamp,
	"updatedAt" timestamp,
	"reporter" json DEFAULT '{"name":"","email":""}'::json,
	"asignee" json DEFAULT '{"name":"","email":""}'::json,
	"comments" json,
	"classification_result" json
);
