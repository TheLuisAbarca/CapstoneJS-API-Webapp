class PokeAPI {
    TCGpokemon = {
      PokeURL: 'https://api.pokemontcg.io/v2/cards?q=',
      passOptions: (objOption) => {
        const options = {
          method: `${objOption}`,
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        };
        return options;
      },
      basicCall2Api: async (query) => {
        const url = this.TCGpokemon.PokeURL + query;
        const options = this.TCGpokemon.passOptions('GET');
        const response = await fetch(url, options);
        return response.json();
      },
      get valueGetAllCards() {
        return this.getTwelveCardsSwSh();
      },
      getCardSetSwShbyId: (cardId) => this.TCGpokemon.basicCall2Api(`id:${cardId}`),
      getTwelveCardsSwSh: () => this.TCGpokemon.basicCall2Api('set.id:swsh1&pageSize=12'),
      getAllCardsFromSetSwSh: () => this.TCGpokemon.basicCall2Api('set.id:swsh1'),
    }
}

const PokemonAPI = new PokeAPI();

export { PokemonAPI, PokeAPI };