var buffer = ""; // for saving numbers when operators are pushed
var memory = 0; //for M button functions
overwrite = true;

var display = document.querySelector(".primaryDisplay");
var buttons = document.querySelectorAll(".button");
var operatorDisplay = document.querySelector(".operatorDisplay");

function press(button) { //function routing for both mouse and keyboard input
    switch (button) {
        case "AC":
            button_ac();
            flash("ac");
            break;
        case "Del":
            button_del();
            flash("del");
            break;
        case "1/x":
            button_1x();
            flash("inverse");
            break;
        case "MC":
            button_mc();
            flash("mc");
            break;
        case "M+":
            button_mplus();
            flash("mplus");
            break;
        case "M-":
            button_mminus();
            flash("mminus");
            break;
        case "MR":
            button_mr();
            flash("mr");
            break;
        case "/":
            button_divide();
            flash("divide");
            break;
        case "x":
            button_multiply();
            flash("multiply");
            break;
        case "-":
            button_subtract();
            flash("subtract");
            break;
        case "+":
            button_add();
            flash("add");
            break;
        case "=":
            button_equals();
            flash("equals");
            break;
        default:
            number(button);
            flash("b" + button);
            break;
    }
}

function flash(id) { //for screen refresh and button press effects
    id = "#" + id;
    var flashButton = document.querySelector(id);
    display.classList.add("flash");
    operatorDisplay.classList.add("flash");
    flashButton.classList.add("black");
    setTimeout(function () {
        display.classList.remove("flash");
        operatorDisplay.classList.remove("flash");
        flashButton.classList.remove("black");
    }, 75);
}

function setOperator(operator, remove) { //also routes to equals key
    if (remove) {
        operatorDisplay.textContent = "";
        overwrite = true;
    } else {
        if (operatorDisplay.textContent != "") {
            button_equals();
        }
        operatorDisplay.textContent = operator;
        buffer = parseFloat(display.textContent);
        overwrite = true;
    }
}

//individual button functions below
function button_ac() {
    display.textContent = "0";
    setOperator("", true);
}

function button_del() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent == "") {
        display.textContent = "0";
    }
}

function button_1x() {
    var number = parseFloat(display.textContent);
    display.textContent = String(1 / number);
}

function button_mc() {
    memory = 0;
}

function button_mplus() {
    memory += parseFloat(display.textContent);
}

function button_mminus() {
    memory -= parseFloat(display.textContent);
}

function button_mr() {
    display.textContent = String(memory);
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
}

function number(num) { //handles all digits and period
    if (overwrite == true) {
        display.textContent = num;
        overwrite = false;
    } else {
        if (display.textContent.endsWith(".") && num == ".") {
            button_del();
        } else {
            display.textContent = display.textContent + num;
        }
    }
    if (display.textContent == ".") {
        display.textContent = "0.";
    }

}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        press(button.textContent, button);
    });
});

document.onkeyup = function (e) { //keyboard functionality
    switch (e.which) {
        case 49:
            press('1');
            break;
        case 97:
            press('1');
            break;
        case 50:
            press('2');
            break;
        case 98:
            press('2');
            break;
        case 51:
            press('3');
            break;
        case 99:
            press('3');
            break;
        case 52:
            press('4');
            break;
        case 100:
            press('4');
            break;
        case 53:
            press('5');
            break;
        case 101:
            press('5');
            break;
        case 54:
            press('6');
            break;
        case 102:
            press('6');
            break;
        case 55:
            press('7');
            break;
        case 103:
            press('7');
            break;
        case 56:
            press('8');
            break;
        case 104:
            press('8');
            break;
        case 57:
            press('9');
            break;
        case 105:
            press('9');
            break;
        case 48:
            press('0');
            break;
        case 96:
            press('0');
            break;
        case 190:
            press('.');
            break;
        case 110:
            press('.');
            break;
        case 65:
            press("AC");
            break;
        case 67:
            press("AC");
            break;
        case 46:
            press("Del");
            break;
        case 8:
            press("Del");
            break;
        case 83:
            press("1/x");
            break;
        case 81:
            press("MC");
            break;
        case 87:
            press("M+");
            break;
        case 69:
            press("M-");
            break;
        case 82:
            press("MR");
            break;
        case 19:
            press("/");
            break;
        case 111:
            press("/");
            break;
        case 88:
            press("x");
            break;
        case 106:
            press("x");
            break;
        case 109:
            press("-");
            break;
        case 189:
            press("-");
            break;
        case 107:
            press("+");
            break;
        case 187:
            press("+");
            break;
        case 13:
            press("=");
            break;
    }

};