interface ExerciseSummary {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))