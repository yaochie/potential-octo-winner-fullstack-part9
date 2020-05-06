import express from 'express'

const app = express()

app.get('/hello', (request, response) => {
    response.send('Hello Full Stack!')
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})