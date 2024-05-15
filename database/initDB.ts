import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = process.env.DB_URL as string;

const client = postgres(connectionString)
const db = drizzle(client);