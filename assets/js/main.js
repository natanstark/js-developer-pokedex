
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemon = new Pokemon()
let loadPokemonView = document.getElementById(`pokemonView#+${pokemon.number}`)



const maxRecords = 151;
const limit = 10;
let offset = 0;

function showPokemonDetails(pokemonNumber) {
    // Lógica para mostrar os detalhes do Pokémon com o número fornecido.
    //console.log(`Mostrando detalhes do Pokémon #${pokemonNumber}`);
    let alertMessage = `
    Mostrando detalhes do Pokémon #${pokemonNumber}    
    `;
    alert(alertMessage);
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) =>{
        const newHtml = pokemons.map ((pokemon) => ` 
            <li class="pokemon ${pokemon.type}">            
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>            
                <div class="detail">
                    <ol class="detail__types">
                        ${pokemon.types.map((type) => `<li class="detail__types--type ${type}">${type}</li>`).join('')}
                    </ol>
                    <button id="pokemonView#${pokemon.number}" class= "view__button" type=button>View more</button>  
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                                     
                </div>
            </li>`).join('')

        pokemonList.innerHTML += newHtml 

        const viewButtons = document.querySelectorAll('.view__button');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                const pokemonNumber = button.id.split('#')[1];
                showPokemonDetails(pokemonNumber);
            });
        });
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const quantityRecordsNextPage = offset+limit

    if (quantityRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else{
    loadPokemonItens(offset, limit)
    }
})


