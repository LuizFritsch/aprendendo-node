<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <img src="./assets/logo.png" alt="vue logo" />
      <hr />
      <h4 class="is-size-4">Pokedex</h4>
      <hr />
      <div class="level-item">
        <div class="field has-addons">
          <p class="control">
            <input
              class="input is-rounded"
              type="text"
              placeholder="Search pokemon by name..."
              v-model="searchField"
            />
          </p>
          <p class="control">
            <button @click="search" class="button is-rounded is-success">Search</button>
          </p>
        </div>
      </div>
      <hr />

      <div v-for="(poke, index) in filteredPokemons" :key="poke.name">
        <Pokemon :name="poke.name" :url="poke.url" :num="index + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Pokemon from "./components/Pokemon";
export default {
  name: "App",
  data() {
    return {
      pokemons: [],
      filteredPokemons: [],
      searchField: "",
    };
  },
  /**
   * created means that every time the app is load,
   * this function is going to be executed
   */
  created: function () {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0")
      .then((response) => {
        this.pokemons = response.data.results;
        this.filteredPokemons = response.data.results;
      })
      .catch((responseError) => {
        console.log(responseError);
      });
  },
  components: {
    Pokemon,
  },
  methods:{
    search: function() {
      this.filteredPokemons = this.pokemons;
      if (this.searchField == '' || this.searchField == ' ') {
        this.filteredPokemons = this.pokemons;
      }else{
        this.filteredPokemons = this.pokemons.filter(pokemon=> pokemon.name == this.searchField);
      }
    }
  },
  computed:{
    searchResult: function() {
      if (this.searchField == '' || this.searchField == ' ') {
        return this.pokemons;
      }else{
        return this.pokemons.filter(pokemon=> pokemon.name == this.searchField);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
