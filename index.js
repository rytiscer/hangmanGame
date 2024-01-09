const wordsArray = [
  "vanduo",
  "langas",
  "kompiuteris",
  "programavimas",
  "stiklas",
  "telefonas",
  "pakrovejas",
  "laidas",
];

let chances = 10;

const form = document.getElementById("form");
const guessCount = document.getElementById("guessCount");
const usedLetters = document.getElementById("guessedLetters");
const infoField = document.getElementById("info");
const guessButton = document.getElementById("submit");
const newGame = document.getElementById("newGame");
guessCount.innerHTML = `Spėjimu skaicius: ${chances}`;
const guessedLetters = [];

const wordGenerator = (wordsArray) => {
  let wordsArrayIndex = Math.floor(Math.random() * wordsArray.length);
  let word = wordsArray[wordsArrayIndex];
  return word;
};

let chosenWord = wordGenerator(wordsArray);

let display = "";
for (let i = 0; i < chosenWord.length; i++) {
  display += "_ ";
}
document.getElementById("word").textContent = display;

const handleGuess = () => {
  let userGuess = document.getElementById("letter").value.toLowerCase();
  document.getElementById("letter").value = "";
  infoField.innerHTML = "";

  if (!userGuess.match(/[a-z]/i)) {
    infoField.innerHTML = "Prasome ivesti raide[a-z]";
    infoField.style.color = "red";
    return;
  }

  if (guessedLetters.includes(userGuess)) {
    infoField.innerHTML = "Šią raidę jau spėjote";
    infoField.style.color = "red";
    return;
  }
  guessedLetters.push(userGuess);

  usedLetters.innerHTML = guessedLetters
    .map((letter) => letter.toUpperCase())
    .join(" ");

  updateWordDisplay(userGuess);

  // Tikrinimas ar visas zodis atspetas
  if (display.indexOf("_") === -1) {
    infoField.innerHTML = "Sveikiname! Jūs atspėjote žodį.";
    infoField.style.color = "green";
    guessButton.disabled = true;
  }
  if (!chosenWord.includes(userGuess)) {
    chances--;
    guessCount.innerHTML = `Liko spėjimų: ${chances}`;
  }

  // Tikrinimas ar dar liko bandymu
  if (chances === 0) {
    infoField.innerHTML = `Baigėsi bandymai. Teisingas žodis buvo: ${chosenWord}`;
    infoField.style.color = "red";
    guessButton.disabled = true;
  }
};

const updateWordDisplay = (userGuess) => {
  // atnaujinimas su atspetom raidem
  let newDisplay = "";
  for (let i = 0; i < chosenWord.length; i++) {
    if (guessedLetters.includes(chosenWord[i])) {
      newDisplay += chosenWord[i] + " ";
    } else {
      newDisplay += "_ ";
    }
  }
  display = newDisplay;
  document.getElementById("word").textContent = display;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleGuess();
});

newGame.addEventListener("click", (e) => {
  window.location.reload();
});
