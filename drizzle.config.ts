import { defineConfig } from 'drizzle-kit'

const DB_URL = process.env.DB_URL as string

export default defineConfig({
    schema: "./database/schemas/issue.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: DB_URL
    },
    verbose: true,
    strict: true
})