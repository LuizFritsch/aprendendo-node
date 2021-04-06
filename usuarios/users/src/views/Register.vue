<template>
  <div>
    <div class="container is-max-desktop">
      <div class="notification">
        <h2 class="title is-2">Create a user</h2>
        <hr />
        <div v-if="error != undefined" class="notification is-danger">
          <p>{{ error }}</p>
        </div>
        <div class="field">
          <div class="control">
            <label class="label" for="Name">Name</label>
            <input
              v-model="name"
              id="Name"
              name="Name"
              class="input"
              type="text"
              placeholder="e.g. luiz fritsch"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label" for="email">Email</label>
            <input
              v-model="email"
              id="email"
              name="email"
              class="input"
              type="email"
              placeholder="e.g. alexsmith@gmail.com"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label" for="Password">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              class="input"
              type="password"
              placeholder="password"
            />
          </div>
        </div>
        <div class="control">
          <button @click="register" class="button is-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      password: "",
      email: "",
      error: undefined,
    };
  },
  methods: {
    register() {
      var usuario = {
        name: this.name,
        password: this.password,
        email: this.email,
      };
      axios
        .post("http://localhost/user/", usuario)
        .then((response) => {
          this.error = undefined;
          console.log(response);
          this.$router.push({name: 'Home'});
        })
        .catch((error) => {
          var msgErro = error.response.data.msg;
          this.error = msgErro;
        });
    },
  },
};
</script>

<style scoped>
</style>