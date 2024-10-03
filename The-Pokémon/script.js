const parentEl = document.querySelector('body')

const newEl = document.createElement('div')
newEl.setAttribute('id', 'container')

newEl.innerHTML = `<h1>Pokémon Card Display</h1>
        <label for="number">Number of Cards:</label>
        <input type="number" id="number" min="1" max="20" value="5">

         <label for="type">Select Type:</label>
        <select id="type">
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="bug">Bug</option>
            <option value="normal">Normal</option>
            <option value="rock">Rock</option>
            <!-- Add more types as needed -->
        </select>

        <button id="fetchButton">Get Pokémon Cards</button>`

const newEl2= document.createElement('div')
newEl2.setAttribute('id', 'cardsContainer')
newEl2.className = 'cards-container'
newEl.appendChild(newEl2)
parentEl.appendChild(newEl)


document.getElementById('fetchButton').addEventListener('click', async() => {

    const number = parseInt(document.getElementById('number').value)
    const selectedType = document.getElementById('type').value

    const cardsContainer = document.getElementById('cardsContainer')
    cardsContainer.innerHTML = ''
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        if(!response.ok) throw new Error('Network response was not ok')

        const typeData = await response.json()

        const pokemonUrls = typeData.pokemon.map(p => p.pokemon.url)

        const pokemonPromises = pokemonUrls.slice(0, number).map(url => fetch(url));

        pokemonResponses = await Promise.all(pokemonPromises)

        const pokemonDataArray = await Promise.all(pokemonResponses.map(res => res.json()))
        
        pokemonDataArray.forEach(pokemonData => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${pokemonData.name}</h3>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>ID: ${pokemonData.id}</p>
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
            `;
            cardsContainer.appendChild(card);
        });
    } 
    catch (error) {
        console.error('Error fetching data:', error);


    }

})

