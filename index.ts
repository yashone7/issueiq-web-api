import { Hono } from 'hono'
import { logger } from 'hono/logger'
import api from './routes/index'
const app = new Hono()


const PORT = process.env.PORT

app.use(logger())

app.get('/', (c) => c.text('Hello Bun!'))
app.route('/api', api)

export default {
    port: PORT,
    fetch: app.fetch
}