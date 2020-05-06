interface BmiArguments {
    height: number;
    weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiArguments => {
    if (args.length !== 4) throw new Error('Expected 2 arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
}

const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ** 2)

    if (18.5 <= bmi && bmi <= 25) {
        return "Normal (healthy weight)"
    } else if (bmi < 18.5) {
        return "Underweight"
    } else if (bmi > 25) {
        return "Overweight"
    }
}

try {
    const { height, weight } = parseBmiArguments(process.argv)
    console.log(calculateBmi(height, weight))
} catch(e) {
    console.log('Error!! Message:', e.message)
}