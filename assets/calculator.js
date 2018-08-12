var buffer = "";
var memory = 0; //for M button functions
overwrite = true;

var display = document.querySelector(".primaryDisplay");
var buttons = document.querySelectorAll(".button");
var operatorDisplay = document.querySelector(".operatorDisplay");

function press(button) {
    if (button.textContent == "AC"){
        button_ac();
    } else if (button.textContent == "Del") {
        button_del();
    } else if (button.textContent == "1/x"){
        button_1x();
    } else if (button.textContent == "MC") {
        button_mc();
    } else if (button.textContent == "M+") {
        button_mplus();
    } else if (button.textContent == "M-") {
        button_mminus();
    } else if (button.textContent == "MR") {
        button_mr();
    } else if (button.textContent == "/") {
        button_divide();
    } else if (button.textContent == "x") {
        button_multiply();
    } else if (button.textContent == "-") {
        button_subtract();
    } else if (button.textContent == "+") {
        button_add();
    } else if (button.textContent == "=") {
        button_equals();
    } else {
        number(button.textContent);
    }
}

function flash() {
    display.classList.add("flash");
    operatorDisplay.classList.add("flash");
    setTimeout(function() {
        display.classList.remove("flash");
        operatorDisplay.classList.remove("flash");
    }, 50);
}

function setOperator(operator, remove) {
    if (remove) {
        operatorDisplay.textContent = "";
        overwrite = true;
    } else {
        if (operatorDisplay.textContent != "") {
            button_equals()
        }
        operatorDisplay.textContent = operator;
        buffer = parseFloat(display.textContent);
        overwrite = true;
    }
    flash();
}

function button_ac() {
    display.textContent = "0";
    setOperator("", true);
}

function button_del() {
    display.textContent = display.textContent.slice(0,-1);
    if (display.textContent == "") { display.textContent = "0";}
    flash();
}

function button_1x() {
    var number = parseFloat(display.textContent);
    display.textContent = String(1 / number);
    flash();
}

function button_mc() {
    memory = 0;
    flash();
}

function button_mplus() {
    memory += parseFloat(display.textContent);
    flash();
}

function button_mminus() {
    memory -= parseFloat(display.textContent);
    flash();
}

function button_mr() {
    display.textContent = String(memory);
    flash();
}

function button_divide() {
    setOperator("/", false);
}

function button_multiply() {
    setOperator("x", false);
}

function button_subtract() {
    setOperator("-", false);
}

function button_add() {
    setOperator("+", false);
}

function button_equals() {
    if (operatorDisplay.textContent == "/" && !overwrite) {
        display.textContent = String(buffer / parseFloat(display.textContent));
    } else if (operatorDisplay.textContent == "x" && !overwrite) {
        display.textContent = String(buffer * parseFloat(display.textContent));
    } else if (operatorDisplay.textContent == "+" && !overwrite) {
        display.textContent = String(buffer + parseFloat(display.textContent));
    } else if (operatorDisplay.textContent == "-" && !overwrite) {
        display.textContent = String(buffer - parseFloat(display.textContent));
    }
    setOperator("", true);
    buffer = parseFloat(display.textContent);
    flash();
}

function number(num) { //handles all numbers and period
    if (overwrite == true) {
        display.textContent = num;
        overwrite = false;
    } else {
        display.textContent = display.textContent + num;
    }
    if (display.textContent == ".") {display.textContent = "0.";}
    flash();
    
}

buttons.forEach( function(button) {
    button.addEventListener("click", function() {
        press(button);
    });
});

document.onkeyup = function(e) {
    switch (e.which) {
        case 49: number('1'); break;
        case 97: number('1'); break;
        case 50: number('2'); break;
        case 98: number('2'); break;
        case 51: number('3'); break;
        case 99: number('3'); break;
        case 52: number('4'); break;
        case 100: number('4'); break;
        case 53: number('5'); break;
        case 101: number('5'); break;
        case 54: number('6'); break;
        case 102: number('6'); break;
        case 55: number('7'); break;
        case 103: number('7'); break;
        case 56: number('8'); break;
        case 104: number('8'); break;
        case 57: number('9'); break;
        case 105: number('9'); break;
        case 48: number('0'); break;
        case 96: number('0'); break;
        case 190: number('.'); break;
        case 110: number('.'); break;
        case 65: button_ac(); break;
        case 67: button_ac(); break;
        case 46: button_del(); break;
        case 83: button_1x(); break;
        case 81: button_mc();break;
        case 87: button_mplus(); break;
        case 69: button_mminus(); break;
        case 82: button_mr(); break;
        case 19: button_divide(); break;
        case 111: button_divide(); break;
        case 88: button_multiply(); break;
        case 106: button_multiply(); break;
        case 109: button_subtract(); break;
        case 189: button_subtract(); break;
        case 107: button_add(); break;
        case 187: button_add(); break;
        case 13: button_equals(); break;
    }

};