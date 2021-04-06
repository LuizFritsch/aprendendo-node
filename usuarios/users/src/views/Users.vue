<template>
  <div class="container">
    <h3 class="title is-3">Admin Panel</h3>
    <hr />
    <section class="section">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <table class="table">
            <thead>
              <tr>
                <th><h5 class="title is-5">Name</h5></th>
                <th><h5 class="title is-5">Email</h5></th>
                <th><h5 class="title is-5">Role</h5></th>
                <th><h5 class="title is-5">Actions</h5></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role | processRole }}</td>
                <td>
                  <div class="buttons">
                    <router-link :to="{ name: 'Edit', params: { id: user.id } }"
                      ><button class="button is-warning">
                        Edit
                      </button></router-link
                    ><button
                      @click="showModal(user.id)"
                      class="button is-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <div :class="{ modal: true, 'is-active': isModalOpen }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Are you sure you want to delete this user?
          </p>
          <button
            @click="hideModal()"
            class="delete"
            aria-label="close"
          ></button>
        </header>

        <footer class="modal-card-foot">
          <button @click="deleteUser()" class="button is-danger">
            Yes, delete it!
          </button>
          <button @click="hideModal()" class="button">No, keep it</button>
        </footer>
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
      .get("http://localhost/user", req)
      .then((response) => {
        console.log(response);
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      deleteUserId: -1,
      isModalOpen: false,
      users: [],
    };
  },
  methods: {
    hideModal: function () {
      this.isModalOpen = false;
    },
    showModal: function (id) {
      this.isModalOpen = true;
      this.deleteUserId = id;
    },
    deleteUser: function () {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .delete("http://localhost/user/" + this.deleteUserId, req)
        .then((response) => {
          console.log(response);
          this.deleteUserId = -1;
          this.isModalOpen = false;
          this.listAllUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listAllUsers: function () {
      var req = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      axios
        .get("http://localhost/user", req)
        .then((response) => {
          console.log(response);
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  filters: {
    processRole: function (params) {
      if (params == 0) {
        return "User";
      } else if (params == 1) {
        return "Admin";
      }
    },
  },
};
</script>

<style scoped>
</style>