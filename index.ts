import { Hono } from 'hono'

const PORT = process.env.PORT

const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))

export default {
    port: PORT,
    fetch: app.fetch
}