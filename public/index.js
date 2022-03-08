let gameData;
const mainDiv = document.querySelector('main');
const playBtn = document.querySelector('#play');
const pokemonImage = document.querySelector('#pokemon-image');
const choices = document.querySelector('#choices');

playBtn.addEventListener('click', fetchData);

async function fetchData() {
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
    choices.addEventListener('click', e =>  {
        const {name} = e.target.dataset;
        const resultClass = (name === gameData.correct.name) ? 
        'correct' : 'incorrect';  
        e.target.classList.add(resultClass);
        console.log(name);

    }); 
}
