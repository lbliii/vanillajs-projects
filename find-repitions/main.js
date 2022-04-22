const word = "milomilo"

function findRepeatingLetters(str) {
    let result = []
    for (let i = 0; i < str.length; i++) {
        let currentLetter = str[i]
        let currentLetterCount = 0
        for (let j = 0; j < str.length; j++) {
        if (currentLetter === str[j]) {
            currentLetterCount++
        }
        }
        if (currentLetterCount > 1) {
        result.push(currentLetter)
        }
    }
    return result
    
}

function findRepeatingNumbers(number) {
    let result = []
    let numberToArray = number.toString().split('')
    
    for (let i = 0; i < numberToArray.length; i++) {
        let currentNumber = numberToArray[i]
        let currentNumberCount = 0
        for (let j = 0; j < numberToArray.length; j++) {
        if (currentNumber === numberToArray[j]) {
            currentNumberCount++
        }
        }
        if (currentNumberCount > 1) {
        result.push(currentNumber)
        }
    }
    return result
    
}


function convertInchesToCentimeters(inches) {
    return inches * 2.54
}

function convertFarenheightIntoCelcius(degrees) {
    return (degrees - 32) * 5 / 9 
}

 