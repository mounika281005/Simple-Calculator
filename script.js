// Function to get the value of history from the UI
function getHistoryValue() {
    return document.getElementById("history").innerText;
}

// Function to write value to the history area on UI
function printHistoryValue(num) {
    document.getElementById("history").innerText = num;
}

// Function to read output value from the UI
function getOutputValue() {
    return document.getElementById("output").innerText;
}

// Function to write value to the output area on UI 
function printOutputValue(num) {
    if (num === "") {
        document.getElementById("output").innerText = num;
    } else {
        document.getElementById("output").innerText = getFormattedNumber(num);
    }
}

// Function to nicely format output string value to a comma-separated value 
function getFormattedNumber(num) {
    if (num == "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

// Function to remove comma separation format from formatted output
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ""));
}

// Event listener for when the DOM content is loaded
addEventListener("DOMContentLoaded", function() {

    // Listen for operator keys click events
    var operators = document.getElementsByClassName("op__key");
    var len = operators.length;
    for (i = 0; i < len; i++) {
        operators[i].addEventListener("click", function() {
            if (this.id == "clear") {
                printHistoryValue("");
                printOutputValue("");
            } else if (this.id == "backspace") {
                var output = reverseNumberFormat(getOutputValue()).toString();
                // Check whether output has a value then remove the last character and print to UI
                if (output) {
                    output = output.substr(0, output.length - 1);
                    printOutputValue(output);
                }
            } else {
                var output = getOutputValue();
                var history = getHistoryValue();
                // Truncate non-numeric type last character from history value
                if (output === "" && history !== "") {
                    if (isNaN(history[history.length - 1])) {
                        history = history.substr(0, history.length - 1);
                    }
                }
                if (output !== "" || history !== "") {
                    // Ternary operation to set output to empty when it is empty
                    output = output === "" ? output : reverseNumberFormat(output);
                    history += output;
                    if (this.id === "=") {
                        var result = eval(history);
                        printOutputValue(result);
                        printHistoryValue("");
                    } else {
                        history += this.id;
                        printHistoryValue(history);
                        printOutputValue("");
                    }
                }
            }
        })
    }

    // Listen for number keys click events
    var numbers = document.getElementsByClassName("num__key");
    var val = numbers.length;
    for (i = 0; i < val; i++) {
        numbers[i].addEventListener("click", function() {
            var output = reverseNumberFormat(getOutputValue());
            if (!isNaN(output)) {
                output += this.id;
                printOutputValue(output);
            }
        })
    }
});
