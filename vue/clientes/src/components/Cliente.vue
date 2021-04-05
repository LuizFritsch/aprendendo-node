<template>
    <div :class="{'cliente':!ehPremium, 'cliente-premium': ehPremium}">
        <h4>Nome: {{cliente.nome}}</h4>
        <hr>
        <p>{{descricao}}</p>
        <hr>
        <p>Numero: {{numero}}</p>
        <hr>
        <p>Email: {{cliente.email | processarEmail}}</p>
        <hr> 
        <!--<p v-show="mostrarIdade">Idade: {{cliente.idade}}</p>
        -->
        <p v-if="mostrarIdade">Idade: {{cliente.idade}}</p>
        <p v-else>o usuario escondeu a idade</p>
        <button @click="mudarCor($event)">mudar cor</button>
        <button @click="emitirEventoDelete">Excluir</button>
        <h4>id especial {{idEspecial}}</h4>
        <hr>
    </div>
</template>

<script>

export default {
    data(){
        return {
            numero : "123",
            descricao: "asdjsiaohdosa",
            ehPremium: false
        }
    },
    props:{
        nome: String,
        email: String,
        idade: Number,
        cliente: Object,
        mostrarIdade: Boolean
    },
    methods:{
        mudarCor: function($event) {
            console.log($event);
            this.ehPremium = !this.ehPremium;
        },
        emitirEventoDelete:function(){
            console.log("emitindo evento do filho");
            this.$emit("meDelete",{component:this, id:this.cliente.id})
        },
        testar:function () {
            console.log("testando pra valer");
            alert(123)
        }
    },
    filters:{
        processarEmail: function(value) {
            return value.toUpperCase();
        }
    },
    computed:{
        idEspecial: function() {
            return (this.cliente.email+this.cliente.nome+this.cliente.id).toUpperCase();
        }
    }

}

</script>

<style scoped>
hr{
    border-color: brown;
}
.cliente{
    background-color: burlywood;
}
.cliente-premium{
    background-color: black;
    color: gold;
}
</style>