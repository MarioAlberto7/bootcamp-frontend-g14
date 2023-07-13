let numeroActual = '0'
let operador = ''
let operando = ''

const inputDisplay = document.querySelector('.display')

const buttons = document.querySelectorAll('button')

buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        console.log(event)

        const buttonText = event.target.textContent
        
        if ('+-*'.includes(buttonText)){
            operador = buttonText
            operando = Number(numeroActual)
            numeroActual = '0'
        } else if (buttonText=== '='){
            
            if (operador === '+'){
                numeroActual = Number(operando) + Number(numeroActual)
            } else if (operador === '-'){
                numeroActual = Number(operando) - Number(numeroActual)
            } else if (operador === '*'){
                numeroActual = Number(operando) * Number(numeroActual)
            }
        } else if (buttonText === 'AC') {
            numeroActual = ''
            operador = ''
            operando = ''
        } else {
            numeroActual = numeroActual + Number
        }

        inputDisplay
    })
})