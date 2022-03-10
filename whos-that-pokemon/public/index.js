let gameData;
const mainDiv = document.querySelector('main');
const playBtn = document.querySelector('#play');
const pokemonImage = document.querySelector('#pokemon-image');
const choices = document.querySelector('#choices');
const textOverlay = document.querySelector('#text-overlay');


addAnswerHandler();
loadVoice(); 
playBtn.addEventListener('click', fetchData);

async function fetchData() {
    mainDiv.classList.remove(`revealed`);
    mainDiv.classList.add(`fetching`);
    gameData = await window.getPokeData();
    showSilhouette();
    displayChoices();    
}

function showSilhouette() { 
    pokemonImage.src = gameData.correct.image;
} 

function displayChoices() {
    const {pokemonChoices} = gameData; 
    const choicesHTML = pokemonChoices.map(({name})=> {
        return `<button data-name="${name}">${name}</button>`
    }).join(''); 
    choices.innerHTML = choicesHTML;
}

function addAnswerHandler() {
    choices.addEventListener('click', e => {
      const { name } = e.target.dataset;
      const resultClass = (name === gameData.correct.name) ?
        'correct' : 'incorrect';
  
      e.target.classList.add(resultClass);
      revealPokemon();

      speakAnswer();

    });
  }

function revealPokemon() {
    mainDiv.classList.add('revealed');
    textOverlay.textContent = `${gameData.correct.name}!`;
  }

function loadVoice () {
    window.speechSynthesis.onvoiceschanged = () => {
        window.femaleVoice = speechSynthesis.getVoices()[2];

    };

} 
function speakAnswer() {
    const utterance = new SpeechSynthesisUtterance(gameData.correct.name); 
    utterance.voice = window.femaleVoice;
    utterance.pitch = 3.1;  
    utterance.rate = 0.45;
    speechSynthesis.speak(utterance);  
}