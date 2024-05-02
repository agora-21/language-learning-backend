import express from 'express'

import initializeRoutes from './routes'

const app = express()
const PORT = process.env.SERVER_PORT

initializeRoutes(app)

app.listen(PORT, () => {
  console.log(`language-learning-backend app listening on port ${PORT}.`)
})
