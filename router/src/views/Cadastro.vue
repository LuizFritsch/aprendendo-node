<template>
  <div>
      <input type="text" name="email" id="email" placeholder="email">
      <br>
      <input type="text" name="nome" id="nome" placeholder="nome">
      <br>
      <button>teste</button>
      <h4>{{parametroRota}}</h4>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
    created(){
        
    },
    data(){
        return{
            parametroRota: "nada"
        }
    }
}
</script>

<style>

</style>