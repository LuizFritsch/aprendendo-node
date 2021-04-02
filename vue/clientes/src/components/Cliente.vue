<template>
    <div>
        <h2>Cliente Aqui!</h2>    
        <h2 id="cliente-nome">{{ nome }}</h2> 
        <hr>
        <p>email do cliente {{email}}</p>
        <input type="text" v-model="nome">
        <input type="text" :value="nome">
        <input type="text" :value="email">
        <input type="text" v-model="email">
        <input type="text" :value="idade">
        <input type="text" v-model="idade">
        <input type="text" :value="numero">
        <input type="text" v-model="numero">
    </div>
</template>

<script>

export default {
    data(){
        return {
            nome : "luiz",
            numero : "123",
            email : "321",
            idade : 0
        }
    }
}

</script>

<style scoped>
hr{
    border-color: brown;
    border-width: 10px;
}
</style>