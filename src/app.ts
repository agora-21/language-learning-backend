import express from 'express'

const app = express()
const PORT = process.env.SERVER_PORT

app.get('/status', (request, response) => {
  response.end()
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
