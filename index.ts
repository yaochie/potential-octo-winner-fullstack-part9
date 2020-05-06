import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_request, response) => {
    response.send('Hello Full Stack!')
})

app.get('/bmi', (request, response) => {
    const weight = Number(request.query.weight)
    const height = Number(request.query.height)

    if (isNaN(weight) || isNaN(height)) {
        return response.status(400).json({
            error: 'Malformed parameters'
        })
    }

    const result = calculateBmi(height, weight)
    return response.json({
        height,
        weight,
        bmi: result
    })
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})