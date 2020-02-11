<template>
  <div>
    <h4>Login</h4>
    <form @submit.prevent="login">
      <label for="username">User name</label>
      <div>
        <input id="username" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <p>
      Not registered?
      <router-link to="/register">Create account</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/");
      });
    }
    // login(e) {
    //   if (this.password.length > 0) {
    //     this.$http
    //       .post("http://localhost:3000/login", {
    //         email: this.email,
    //         password: this.password
    //       })
    //       .then(response => {
    //         localStorage.setItem("user", JSON.stringify(response.data.user));
    //         localStorage.setItem("jwt", response.data.token);

    //         if (localStorage.getItem("jwt") != null) {
    //           this.$emit("loggedIn");
    //           if (this.$route.params.nextUrl != null) {
    //             this.$router.push(this.$route.params.nextUrl);
    //           } else {
    //             if (is_admin == 1) {
    //               this.$router.push("admin");
    //             } else {
    //               this.$router.push("dashboard");
    //             }
    //           }
    //         }
    //       })
    //       .catch(function(error) {
    //         console.error(error.response);
    //       });
    //   }
    // }
  }
};
</script>