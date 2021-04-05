<template>
  <div id="pokemon">
    <div class="card">
      <div class="card-image">
        <figure>
          <img :src="currentImg" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ num }} - {{ name | upper }}</p>
            <p class="subtitle is-6">{{ pokemon.type }}</p>
          </div>
        </div>

        <div class="content">
            <button class="button is-medium is-fullwidth" @click="changeSprite">Change Sprit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  /**
   * for each pokemon in the pokemons list get
   */
  created: function () {
    axios
      .get(this.url)
      .then((response) => {
        this.pokemon.type = response.data.types[0].type.name;
        this.pokemon.front = response.data.sprites.front_default;
        this.pokemon.back = response.data.sprites.back_default;
        this.currentImg = this.pokemon.front;
        //console.log(this.pokemon);
      })
      .catch((responseError) => {
        console.log(responseError);
      });
  },
  data() {
    return {
      isFront: true,
      currentImg: "",
      pokemon: {
        type: "",
        front: "",
        back: "",
      },
    };
  },
  props: {
    num: Number,
    name: String,
    url: String,
  },
  filters: {
    /**
     * transform first letter in names in uppercase
     */
    upper: function (value) {
      return value[0].toUpperCase() + value.slice(1);
    },
  },
  methods:{
      changeSprite: function() {
          if (this.isFront) {
              this.isFront = false;
              this.currentImg = this.pokemon.back;
          }else{
              this.isFront = true;
              this.currentImg = this.pokemon.front;
          }
      }
  }
};
</script>

<style>
#pokemon {
  margin-top: 2%;
}
</style>