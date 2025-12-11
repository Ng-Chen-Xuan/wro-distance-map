let newCalculation = false;
        
function appendCharacter(character) {
    let display = document.getElementById('display');
    if (newCalculation && '+-*/'.includes(character)) {
        /*display.value = '';*/
        newCalculation = false;
    }
    else if (newCalculation && '0123456789'.includes(character)){
        display.value = '';
        newCalculation = false;
    }

    let lastChar = display.value.slice(-1);
    if ('+-*/.'.includes(character) && '+-*/.'.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + character;
        return;
    }

    if (display.value == "0"){
        display.value = character;
    }
    else{
        display.value += character;
    }
    
}
        
function clearDisplay() {
    document.getElementById('display').value = '';
    newCalculation = false;
    display.value = "0";
}
        
function deleteLast() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}
        
function calculateResult() {
    try {
        let display = document.getElementById('display');
        display.value = eval(display.value);
        newCalculation = true;
     } catch (error) {
        display.value = "Error";
        /*alert('輸入錯誤');*/
        clearDisplay();
    }
}
        

document.addEventListener('keydown', function(event) {
    const active = document.activeElement;
    if (active && active.id === "Wheel-Diameter") {
        // 輸入框內保留原生鍵盤行為
        if (event.key === 'Enter') {
            // 按 Enter 後讓輸入框失去焦點
            active.blur();
            // Update measurement table when wheel diameter changes
            if (typeof updateMeasurementTable === 'function') {
                updateMeasurementTable();
            }
        }
        return; // 不阻止其他鍵
    }

    const validKeys = 'zZxX0123456789+-*/.=BackspaceEnter';
    if (validKeys.includes(event.key)) {
        event.preventDefault();
        if (event.key === 'Enter') {
            calculateResult();
        } else if (event.key === 'Backspace') {
            deleteLast();
        } else if ('cC'.includes(event.key)) {
            clearDisplay();
        } else if ('zZ'.includes(event.key)) {
            multiplyBy(360/25)
        } else if ('xX'.includes(event.key)) {
            multiplyBy(250/90)
        } else if ('0123456789+-*/.='.includes(event.key)) {
            appendCharacter(event.key);
        }
    }
});

function multiplyBy(factor) {
    let display = document.getElementById('display');
    if (display.value) {
        var value = eval(display.value)
        display.value = eval(value + '*' + factor);
    }
    newCalculation = true;
}