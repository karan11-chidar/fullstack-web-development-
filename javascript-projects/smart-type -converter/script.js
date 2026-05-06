btn.addEventListener('click', function () {
    const inputValue = document.getElementById('inputValue').value;

    let result = document.getElementById('result');
    result.innerHTML = ""; // Clear previous result
    let type = typeof inputValue;
    let num = Number(inputValue);
    if (isNaN(num)) {
        // Not a number, so it's a string
        result.innerHTML = `Type : ${type}\n Converted : ${"Not a number"}`;
    } else {
        result.innerHTML = `Type : ${type}\n Converted : ${num}`;
    }
});
