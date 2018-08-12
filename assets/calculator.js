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