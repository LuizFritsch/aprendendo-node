<template>
  <div id="app">
    <div class="buttons">
  <button class="button is-primary">Primary</button>
  <button class="button is-link">Link</button>
</div>
    <h3>cadastro</h3>
    <input type="text" name="nome" id="nome" placeholder="nome" v-model="campoNome">
    <small v-show="deuErro" id="nome-erro">o nome eh invalido, tente novamente!</small>
    <input type="email" name="email" id="email" placeholder="email" v-model="campoEmail">
    <input type="number" name="idade" id="idade" placeholder="idade" v-model="campoIdade">
    <button @click="inserir()">Inserir</button>
    <hr>
    <h1>teste</h1>
    <div v-for="(cliente,index) in orderClientes" :key="cliente.id">
      <h4>{{index+1}}</h4>
      <Cliente :cliente="cliente" @meDelete="deletarUsuario($event)"/>
      <hr>
      <h4>Edicao:</h4>
      <input type="text" v-model="cliente.nome">
      <input type="text" v-model="cliente.email">
    </div>
    <!--<input type="text" v-model="nomeLuiz" />
    <input type="text" v-model="clienteLuiz.nome"/>
    <Cliente idade="23" :nome="nomeLuiz" email="emailgenerico@gmail.com" />
    <Cliente idade="24" nome="luiz 2" email="emailgenerico2@gmail.com" />
    <Cliente idade="25" nome="luiz 3" email="emailgenerico3@gmail.com" />
    -->
  </div>
</template>

<script>
import _ from 'lodash';
import Cliente from "./components/Cliente";
export default {
  name: "App",
  data() {
    return {
      deuErro:false,
      campoNome:"",
      campoEmail:"",
      campoIdade:"",
      clientes: [
        {id:2,
          nome: "luiz data biding",
          email: "teste@gmail.com",
          idade: 30
        },
        {id:3,
          nome: "data biding",
          email: "batatat@gmail.com",
          idade: 50
        },
        {id:4,
          nome: "luiz data",
          email: "repolho@gmail.com",
          idade: 40
        },
        {
          id:5,
          nome: "luizdatarepolho",
          email: "repo@gmail.com",
          idade: 30
        }
      ]
    };
  },
  components: {
    Cliente
  },
  methods:{
    inserir: function() {
      if (this.campoNome==undefined || this.campoNome == " " || this.campoNome.length<3) {
        this.deuErro = true;
        console.log("erro de validacao");
      }else{
        this.clientes.push({nome: this.campoNome, email: this.campoEmail, idade: this.campoIdade, id: Date.now()})
        this.campoNome="";
        this.campoIdade="";
        this.campoEmail="";
        this.deuErro = false;
      }
    },
    deletarUsuario: function($event) {
      console.log($event);
      console.log($event.id)
      $event.component.testar();
      var id = $event.id;
      var novoArray = this.clientes.filter(cliente => cliente.id != id);
      this.clientes = novoArray;
    }
    
  },
  computed:{
    orderClientes: function() {
      return _.orderBy(this.clientes,['nome'],['asc']);
    }
  }
};
</script>

<style>

#nome-erro{
  color: red;
}
</style>
