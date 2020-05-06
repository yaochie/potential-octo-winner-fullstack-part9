interface ExerciseArguments {
    target: number
    dailyExercise: Array<number>
}

interface ExerciseSummary {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
    if (args.length < 4) throw new Error('Too few arguments')

    const numbers = args.slice(2)
    if (numbers.every(n => !isNaN(Number(n)))) {
        return {
            target: Number(numbers[0]),
            dailyExercise: numbers.slice(1).map(n => Number(n))
        }
    } else {
        throw new Error('Provided values were nots numbers!')
    }
}

const calculateExercises = (dailyExercise: Array<number>, target: number): ExerciseSummary => {
    const sum = dailyExercise.reduce((acc, curr) => acc + curr, 0)
    const average = sum / dailyExercise.length

    let rating, ratingDescription
    if (average >= target) {
        rating = 3
        ratingDescription = 'Great! You met your target.'
    } else if (average >= target * 0.75) {
        rating = 2
        ratingDescription = 'Not too bad, but could be better'
    } else {
        rating = 1
        ratingDescription = 'Need to improve!'
    }
    
    return {
        periodLength: dailyExercise.length,
        trainingDays: dailyExercise.filter(n => n > 0).length,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    }
}

try {
    const { target, dailyExercise } = parseExerciseArguments(process.argv)
    console.log(calculateExercises(dailyExercise, target))
} catch(e) {
    console.log('Error!! Message:', e.message)
}