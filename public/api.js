window.getPokeData = async function() {
    const pokemon = await getPokemon();
    const randomPokemon = shuffle(pokemon);
    const pokemonChoices = get4Pokemon(randomPokemon);
    const [firstPokemon] = pokemonChoices;
    const number = getPokemonNumber(firstPokemon);
    const image = getPokemonImage(number);
    return {
        pokemonChoices,
        correct: {
            image,
            name: firstPokemon.name
        }

    }
 
};



async function getPokemon() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemon = await res.json();
    
    return pokemon.results;
  }

function shuffle(unshuffled){
    const shuffled = unshuffled    
    shuffled.sort(()=> Math.random() - Math.random());
    return shuffled;
}

function get4Pokemon(randomPokemon) {
    return randomPokemon.splice(0,4)
}

function getPokemonNumber({ url }) { 
    const numberRegEx = /(\d+)\/$/;
    return (url.match(numberRegEx) || [])[1];
}

function getPokemonImage(number){
    return `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/${number}.png`;
}