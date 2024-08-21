<template>
  <div class="home-page">
    <div v-if="!isAuthenticated" class="login-section">
      <h1>Login Page</h1>
      <input
        type="email"
        v-model="email"
        placeholder="Enter your email address"
      />
      <button @click="handleLogin" :disabled="isLoginInProgress">
        Login with Microsoft
      </button>
    </div>
    <div v-else class="content-section">
      <h1>Welcome to the Home Page</h1>
      <p>You are logged in as {{ email }}!</p>
      <button @click="handleLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import { initializeMsal, login, getAccount, logout } from "../msalService";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      isAuthenticated: false,
      isLoginInProgress: false, // Track the login state
    };
  },
  async mounted() {
    await initializeMsal(); // Ensure MSAL is initialized and handleRedirectPromise is called
    const account = getAccount();
    if (account) {
      this.email = account.username; // Set the email if already logged in
      this.isAuthenticated = true;
    }
  },
  methods: {
    handleLogin() {
      if (!this.email) {
        alert("Please enter your email address.");
        return;
      }

      this.isLoginInProgress = true; // Set login progress state to true

      try {
        login({ loginHint: this.email });
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        this.isLoginInProgress = false; // Reset login progress state
      }
    },
    handleLogout() {
      logout();
      this.isAuthenticated = false;
      this.email = ""; // Clear the email on logout
    },
  },
};
</script>
