class Calculator {
    constructor() {
        this.result = ""
    }
}
class Button {
    constructor(id){
        this.id = id

        switch(id) { 
            case 0: 
                this.value = 0
                break;
            case 1: 
                this.value = 1
                break;
            case 2: 
                this.value = 2
                break;
            case 3: 
                this.value = 3
                break;
            case 4: 
                this.value = 4 
                break;
            case 5: 
                this.value = 5 
                break; 
            case 6: 
                this.value = 6 
                break; 
            case 7: 
                this.value = 7 
                break; 
            case 8: 
                this.value = 8 
                break; 
            case 9: 
                this.value = 9 
                break; 
            case 10: 
                this.value = 10
                break; 
            case 11: 
                this.value = '+'
                break; 
            case 12:
                this.value = '- 10'
                break; 
            case 13: 
                this.value = '*'
                break; 
            case 14: 
                this.value = '/'
                break;
            case 15:
                this.value = '%'
                break; 
            case 16: 
                this.value = '* 0'
                break;
            case 17: 
                this.value = '='
        }
    }
}

let buttons = []
for(i = 0; i < 19; i++) buttons.push(new Button(i))

let problem = 0
let inputs = [buttons[3].value, buttons[11].value, buttons[12].value]

for (let i = 0; i < inputs.length; i++) {
    problem += inputs[i];
    solution = parseInt(problem)
    ddd = Number(solution)
    
}


console.log(buttons)
console.log(buttons[1])
console.log(inputs)
console.log(problem)
console.log(solution) 

console.log(ddd)
