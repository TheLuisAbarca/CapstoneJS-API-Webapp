class PokeAPI {
    TCGpokemon = {
      PokeURLCards: 'https://api.pokemontcg.io/v2/cards',
      PokeURLSets: 'https://api.pokemontcg.io/v2/sets',
      passOptions: (objOption) => {
        const options = {
          method: `${objOption}`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        };
        return options;
      },
      basicCall2Api: async (urlPoke, query) => {
        const url = urlPoke + query;
        const options = this.TCGpokemon.passOptions('GET');
        const response = await fetch(url, options);
        return response.json();
      },
      get valueGetAllCards() {
        return this.getTwelveCardsSwSh();
      },
      getCardSetSwShbyName: (cardName) => this.TCGpokemon.basicCall2Api(this.TCGpokemon.PokeURLCards, `?q=name:${cardName}`),
      getTwelveCardsSwSh: () => this.TCGpokemon.basicCall2Api(this.TCGpokemon.PokeURLCards, '?q=set.id:swsh1&pageSize=12'),
      getAllCardsFromSetSwSh: () => this.TCGpokemon.basicCall2Api(this.TCGpokemon.PokeURLCards, '?q=set.id:swsh1'),
      getAllCardsFromSet: (setId) => this.TCGpokemon.basicCall2Api(this.TCGpokemon.PokeURLCards, `?q=set.id:${setId}`),
      getAllCards: () => this.TCGpokemon.basicCall2Api(this.TCGpokemon.PokeURLCards, '?page=58pageSize=250'),
      getAllSets: () => this.TCGpokemon.basicCall2Api(this.TCGpokemon.PokeURLSets, ''),
    }
}

const PokemonAPI = new PokeAPI();

export { PokemonAPI, PokeAPI };