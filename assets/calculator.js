var buffer = "";
var memory = 0;
var last_operation = "";
overwrite = false;

var display = document.querySelector(".display");
var buttons = document.querySelectorAll(".button");

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
        if (button.textContent != "." && display.textContent == "0") {
            display.textContent = "";
        }
        number(button.textContent);
    }
}

function flash() {
    display.classList.add("flash");
    setTimeout(function() {
        display.classList.remove("flash");
    }, 100);
}

function button_ac() {
    display.textContent = "0";
    overwrite = false;
    flash();
}

function button_del() {
    display.textContent = display.textContent.slice(0,-1);
    if (display.textContent == "") { display.textContent = "0";}
    flash();
}

function button_1x() {
    var number = parseFloat(display.textContent);
    display.textContent = String(1 / number);
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
    last_operation = "/";
    buffer = parseFloat(display.textContent);
    overwrite = true;
    flash();
}

function button_multiply() {
    last_operation = "x";
    buffer = parseFloat(display.textContent);
    overwrite = true;
    flash();
}

function button_subtract() {
    last_operation = "-";
    buffer = parseFloat(display.textContent);
    overwrite = true;
    flash();
}

function button_add() {
    last_operation = "+";
    buffer = parseFloat(display.textContent);
    overwrite = true;
    flash();
}

function button_equals() {
    if (last_operation == "/") {
        display.textContent = String(buffer / parseFloat(display.textContent));
    } else if (last_operation == "x") {
        display.textContent = String(buffer * parseFloat(display.textContent));
    } else if (last_operation == "+") {
        display.textContent = String(buffer + parseFloat(display.textContent));
    } else if (last_operation == "-") {
        display.textContent = String(buffer - parseFloat(display.textContent));
    }
    last_operation = "";
    overwrite = true;
    buffer = 0;
    flash();
}

function number(num) {
    if (overwrite == true) {
        display.textContent = num;
        overwrite = false;
    } else {
        display.textContent = display.textContent + num;
    }
    
}


buttons.forEach( function(button) {
    button.addEventListener("click", function() {
        press(button);
    });
});