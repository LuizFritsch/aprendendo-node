<template>
  <div>
    <div class="container is-max-desktop">
      <div class="notification">
        <h2 class="title is-2">Edit an user</h2>
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
        <div class="control">
          <button @click="edit" class="button is-primary">Edit</button>
          <button @click="cancel" class="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost/user/" + this.$route.params.id, req)
      .then((response) => {
        this.name = response.data.name;
        this.email = response.data.email;
        this.id = response.data.id;
      })
      .catch((error) => {
        console.log(error);
        this.$router.push({ name: "Users" });
      });
  },
  data() {
    return {
      name: "",
      email: "",
      error: undefined,
      id: -1,
    };
  },
  methods: {
    cancel(){
      this.$router.push({ name: "Users" });
    },
    edit() {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      var usuario = {
        name: this.name,
        email: this.email,
        id: this.id,
      };
      console.log(usuario);
      axios
        .put("http://localhost/user/"+usuario.id, usuario, req)
        .then((response) => {
          this.error = undefined;
          console.log(response);
          this.$router.push({ name: "Users" });
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