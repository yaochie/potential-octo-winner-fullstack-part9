import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_request, response) => {
    response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) => {
    const weight = Number(request.query.weight);
    const height = Number(request.query.height);

    if (isNaN(weight) || isNaN(height)) {
        return response.status(400).json({
            error: 'Malformed parameters'
        });
    }

    const result = calculateBmi(height, weight);
    return response.json({
        height,
        weight,
        bmi: result
    });
});

app.post('/exercises', (request, response) => {
    const body = request.body;

    if (body.target === undefined || body.dailyExercises === undefined) {
        return response.status(400).json({
            error: 'Missing parameters'
        });
    }

    const target = Number(body.target);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dailyExercises = body.dailyExercises.map((b: any) => Number(b));

    if (isNaN(target) || dailyExercises.some((e: number) => isNaN(e))) {
        return response.status(400).json({
            error: 'Malformed parameters'
        });
    }

    const result = calculateExercises(dailyExercises, target);
    return response.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});