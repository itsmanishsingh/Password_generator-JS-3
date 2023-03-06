const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Generating event listener

generateEl.addEventListener('click' , ()=>{
    const length = +lengthEl.value;  // + =  convert to numbers
    const haslower = lowercaseEl.checked;
    const hasupper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasNumber,
        haslower,
        hasupper,
        hasSymbol,
        length
    );
})

//Copy paste to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
	const password = resultEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
})


function generatePassword(lower, upper, number, symbol, length) {
    /*
    1. initialise pass variables
    2. filter out unchecked types
    3. loop over length call generator function fot each type
    4. Add final pass to the pass variables and return
    */

    let generatedPassword = '';
    const typeCount = lower + upper + number + symbol;

    const typeArray = [ { lower} , { upper} , { number} , { symbol }].filter(
        (item)=> Object.values(item)[0]
    );

    if(typeCount === 0){
        return '';
    }

    for(let i=0 ; i<length ; i+=typeCount){
        typeArray.forEach((type)=>{
            const functionName = Object.keys(type)[0];

            generatedPassword += randomFunc[functionName]();
        });
    }

    const finalPassword = generatedPassword.slice(0,length);
    return finalPassword;


}

// Generate funciton - 
// charset from - "https://net-comber.com/charset.html"

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*10)+97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*10)+65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getRandomSymbol() {
    const symbols = '~`!#$%^&*()-_+|?.,<>"{}=/';
    return symbols[Math.floor(Math.random()*symbols.length)];  // here a random number is being selected and corresponding to that number symbol is being used 

}


